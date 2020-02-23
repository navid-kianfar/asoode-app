import React, { Component } from "react";
import { Text, View, Card, Icon, CardItem, Left, Body } from "native-base";
import { AttachmentType } from "../../library/enums";
import PropTypes from "prop-types";
import { TouchableOpacity, Linking } from "react-native";
import Image from "../elements/image";
import Styles from "../file-item/styles";
import FileService from "../../services/file-service";
import Moment from "react-moment";
import { AttachmentBoardDTO, BoardListCardDTO } from "../../dtos/board.dtos";
import MicroBoard from "../micro-board";
import BoardListCard from "../board-list-card";
import BackgroundWrapper from "../elements/background-wrapper";
import GS from "../../themes/general-styles";
import I18n from "../../i18n";

const MomentText = ({ children }) => {
  return <Text note>{children}</Text>;
};

class AttachmentItem extends Component {
  openAttachment = () => {
    const data = this.props.data;
    switch (data.attachmentType) {
      case AttachmentType.Link:
        Linking.openURL(data.path);
        break;
      case AttachmentType.File:
      // OpenFile
    }
  };
  render() {
    const data = this.props.data;
    if (this.props.appAttachment) {
      return (
        <View style={GS.pb3}>
          {data.attachmentType === AttachmentType.Board ? (
            <MicroBoard data={data.board} navigation={this.props.navigation} />
          ) : (
            <BackgroundWrapper
              color={data.board.color}
              picture={data.board.picture}
              style={[GS.py2, { borderRadius: 5 }]}
            >
              <BoardListCard
                navigation={this.props.navigation}
                data={data.card}
              />
              <Text style={GS.mx2}>
                {data.board.title}: {data.listName}
              </Text>
            </BackgroundWrapper>
          )}
          <TouchableOpacity style={GS.mx2}>
            <Text primary>{I18n.t("REMOVE")}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Card noBorder noShadow>
        <TouchableOpacity onPress={this.openAttachment} activeOpacity={0.8}>
          <CardItem dir thumbnail>
            <Left>
              {data.attachmentType === AttachmentType.Link ? (
                <View style={Styles.imageContainer}>
                  <Icon name="link" type="Feather" />
                </View>
              ) : (
                <Image
                  containerStyle={Styles.imageContainer}
                  style={Styles.image}
                  resizeMode={data.image ? "cover" : "contain"}
                  source={
                    data.image
                      ? data.image
                      : FileService.fileThumbnail(data.extension)
                  }
                />
              )}
            </Left>
            <Body>
              <Text bold>{data.fileName || data.linkName || data.path}</Text>
              <Moment locale="fa" element={MomentText} local fromNow>
                {data.createdAt}
              </Moment>
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }
}

const { string, number, bool, oneOf, shape } = PropTypes;
AttachmentItem.propTypes = {
  data: shape({
    attachmentType: oneOf(Object.values(AttachmentType)),
    boardId: string,
    cardId: string,
    createdAt: string,
    extension: string,
    fileName: string,
    hasPermission: bool,
    id: string,
    image: string,
    index: number,
    isCover: bool,
    linkName: string,
    listId: string,
    path: string,
    recordId: string,
    title: string,
    userId: string,
    listName: string,
    card: shape(BoardListCardDTO),
    board: shape(AttachmentBoardDTO)
  }),
  appAttachment: bool
};

export default AttachmentItem;
