import React, { Component } from "react";
import {LayoutAnimation, TouchableOpacity} from "react-native";
import {View, Text, Right, Button, Icon} from "native-base";
import Hyperlink from "react-native-hyperlink";
import PropTypes from "prop-types";
import FileService from "../../../../services/file-service";
import Thumbnail from "../../../../components/elements/thumbnail";
import IdentityService from "../../../../services/identity-service";
import Styles from "../styles";
import Moment from "react-moment";
import { ChatMessageDTO } from "../../../../dtos/chat.dtos";
import { ChatType } from "../../../../library/enums";
import BoardListCard from "../../../../components/board-list-card";
import MicroBoard from "../../../../components/micro-board";
import Image from "../../../../components/elements/image";
import GS from "../../../../themes/general-styles";
import CircleProgress from "../../../../components/elements/circle-progress";

export default class ChatFieldItem extends Component {
  static defaultProps = {
    openImageModal: () => {},
  };
  static propTypes = {
    data: PropTypes.shape(ChatMessageDTO),
    first: PropTypes.bool,
    navigation: PropTypes.any,
    openImageModal: PropTypes.func,
    optionsVisible: PropTypes.bool,
    optionsVisibleChange: PropTypes.func,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { optionsVisible } = this.props;
    if (nextProps.optionsVisible !== optionsVisible) {
      return true;
    }
    return true;
  }
  DateText = props => (
    <Text style={[Styles.chatDate, this.yourChat ? Styles.yourChatDate : null]}>
      {props.children}
    </Text>
  );
  showOptions = () => {
    this.props.optionsVisibleChange(this.props.data.id);
  };
  closeOptions = () => {
    this.props.optionsVisibleChange(undefined);
  };
  openImageModal = () => {
    this.props.openImageModal(this.props.data.attachment);
  };
  openFile = () => {
    alert('openFile');
  };
  yourChat = this.props.data.sender.id === IdentityService.userId;
  isImage =
    this.props.data.attachment &&
    FileService.isImage(this.props.data.attachment);
  renderMessage = () => {
    const data = this.props.data;
    switch (data.type) {
      case ChatType.Text:
        return (
          <Hyperlink
            linkDefault
            onLongPress={this.showOptions}
            linkStyle={{ color: this.yourChat ? "#5cd2ff" : "#1d96ff" }}
          >
            <Text
              style={[
                Styles.chatMessage,
                this.yourChat ? Styles.yourChatMessage : null
              ]}
            >
              {this.props.data.message}
            </Text>
          </Hyperlink>
        );
      case ChatType.File:
        if (this.isImage) {
          return (
            <TouchableOpacity
              style={Styles.fullMessageArea}
              onPress={this.openImageModal}
              onLongPress={this.showOptions}
              activeOpacity={1}
            >
              <Image
                source={data.attachment}
                containerStyle={Styles.imageWrapper}
                style={Styles.sharedImage}
              />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={this.openFile}
            onLongPress={this.showOptions}
            style={GS.flexRow}>
            <Image source={FileService.fileThumbnail(data.attachment)} />
            <CircleProgress
              containerStyle={GS.alignSelfCenter}
              onPress={() => {console.log('cancel')}}
              model={20}
              spin>
              <Icon name="close" type="MaterialIcons" />
            </CircleProgress>
            <Text
              style={[
                Styles.chatMessage,
                this.yourChat ? Styles.yourChatMessage : null
              ]}
              numberOfLines={2}
            >
              {FileService.extractName(data.attachment)}
            </Text>
          </TouchableOpacity>
        );
      case ChatType.Card:
        return (
          <View style={Styles.fullMessageArea}>
            <View style={{ marginBottom: -10, marginHorizontal: -10 }}>
              <BoardListCard
                data={data.cardAttachment}
                hasPermission={data.hasPermission}
                navigation={this.props.navigation}
                onLongPress={this.showOptions}
              />
            </View>
          </View>
        );
      case ChatType.Board:
        return (
          <View style={Styles.fullMessageArea}>
            <MicroBoard
              data={data.boardAttachment}
              navigation={this.props.navigation}
              onLongPress={this.showOptions}
            />
          </View>
        );
    }
  };
  render() {
    return (
      <>
        {this.props.optionsVisible ? (
          <View style={this.yourChat ? [GS.mx2] : [GS.mx5, GS.alignItemsStart]}>
            <View style={[
              GS.flexRowDir,
              GS.mx1
            ]}>
              <Button style={[GS.mx1, GS.my1]} circle gray>
                <Icon name="like2" type="AntDesign" />
              </Button>
              <Button style={[GS.mx1, GS.my1]} circle gray>
                <Icon name="pushpino" type="AntDesign" />
              </Button>
            </View>
          </View>
        ) : null}
        <View
          style={[Styles.chatItem, this.yourChat ? Styles.yourChatItem : null]}
        >
          {!this.yourChat ? (
            <View style={{ width: 32 }}>
              {this.props.first ? (
                <Thumbnail
                  extraSmall
                  title={this.props.data.sender.initials}
                  source={this.props.data.sender.avatar}
                />
              ) : null}
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={1}
            onLongPress={this.showOptions}
            style={[
              Styles.messageBox,
              this.yourChat ? Styles.yourMessageBox : null,
              this.isImage || this.props.data.type === ChatType.Card
                ? GS.flex1
                : null
            ]}
          >
            {this.props.first && !this.yourChat ? (
              <View style={Styles.chatHeader}>
                <Text
                  style={[
                    Styles.chatName,
                    {
                      paddingBottom:
                        this.props.data.type !== ChatType.Text ? 10 : 0
                    }
                  ]}
                  numberOfLines={1}
                >
                  {this.props.data.sender.fullName}
                </Text>
              </View>
            ) : null}
            {this.renderMessage()}
          </TouchableOpacity>
          <View>
            <Moment
              locale="fa"
              element={this.DateText}
              local
              // format="HH:mm"
              fromNow
            >
              {this.props.data.createdAt}
            </Moment>
          </View>
        </View>
      </>
    );
  }
}
