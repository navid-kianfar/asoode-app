import React, { Component } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Modal from "../../elements/modal";
import Styles from "../attachment-modal/styles";
import {
  Body,
  Button,
  Card,
  CardItem,
  Icon,
  Left,
  Text,
  View
} from "native-base";
import GS from "../../../themes/general-styles";
import I18n from "../../../i18n";
import Thumbnail from "../../elements/thumbnail";
import PropTypes from "prop-types";
import { MemberItemDTO } from "../../../dtos/board.dtos";
import { BoardPermission } from "../../../library/enums";
import { Metrics } from "../../../themes/variables";

class CardMembersModal extends Component {
  state = {
    visible: false
  };
  close = () => {
    this.setState({ visible: false });
  };
  open = () => {
    this.setState({ visible: true });
  };
  toggleMember = id => {};
  renderItem = ({ item }) => {
    const checked =
      this.props.cardMembers.findIndex(m => m.id === item.id) !== -1;
    return (
      <Card transparent>
        <TouchableOpacity
          onPress={() => this.toggleMember(item.id)}
          activeOpacity={0.85}
        >
          <CardItem dir thumbnail>
            <Left>
              <Thumbnail source={item.avatar} title={item.initials} small />
            </Left>
            <Body
              style={[
                GS.flexRowDir,
                GS.alignItemsCenter,
                I18n.isRtl ? GS.ps0 : GS.pe0
              ]}
            >
              <View style={[GS.flex1, GS.flexShrink1]}>
                <Text numberOfLines={1}>{item.fullName}</Text>
              </View>
              {checked ? (
                <Icon
                  style={[GS.mx0, { fontSize: 30 }]}
                  name="check"
                  type="Feather"
                />
              ) : null}
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  };
  render() {
    return (
      <Modal
        style={Styles.modal}
        isVisible={this.state.visible}
        onBackdropPress={this.close}
        onSwipeComplete={this.close}
        swipeDirection="down"
        propagateSwipe
      >
        <View bg1>
          <View bg2 style={[Styles.header, GS.mt3]}>
            <Text mute style={Styles.headerTitle}>
              {I18n.t("MEMBERS")}
            </Text>
          </View>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            style={{ maxHeight: Metrics.HEIGHT - Metrics.modalHeader }}
            contentContainerStyle={GS.flexGrow1}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            data={this.props.boardMembers}
          />
        </View>
      </Modal>
    );
  }
}
const { string, shape, arrayOf, oneOf } = PropTypes;
CardMembersModal.propTypes = {
  cardId: string,
  cardMembers: arrayOf(shape(MemberItemDTO)),
  boardMembers: arrayOf(shape(MemberItemDTO)),
  permission: oneOf(Object.values(BoardPermission))
};

export default CardMembersModal;
