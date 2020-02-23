import React, { Component } from "react";
import Alert from '../../../services/alert-service';
import Modal from "../../elements/modal";
import { FlatList, TouchableOpacity } from "react-native";
import { View, Text, Body, Button } from "native-base";
import I18n from "../../../i18n";
import PropTypes from "prop-types";
import Styles from "./styles";
import UserItem from "../../user-item";
import { BoardPermission } from "../../../library/enums";
import GS from "../../../themes/general-styles";
import {elementTypes} from "../../elements/form/form-element";

export default class InviteMembersModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    boardId: PropTypes.string,
    permission: PropTypes.oneOf(Object.values(BoardPermission)),
    onRemoveUser: PropTypes.func
  };
  static defaultProps = {
    data: [],
    permission: BoardPermission.Virtual,
    OnRemoveUser: () => {}
  };
  isOnlyAdmin =
    this.props.data.filter(m => m.permission === BoardPermission.Admin)
      .length === 1;
  state = {
    visible: false
  };
  open = () => {
    this.setState({
      visible: true
    });
  };
  close = () => {
    this.setState({
      visible: false
    });
  };
  renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: -5 }}>
        <UserItem
          data={item}
          permission={this.props.permission}
          onRemoveUser={() => this.props.removeUser(item)}
          isOnlyAdmin={this.isOnlyAdmin}
        />
      </View>
    );
  };
  addMember = () => {
    const form = [
      {
        type: 'input',
        field: 'email',
        label: I18n.t('EMAIL'),
        //  TODO: validate email
        validation: {
          required: true,
          // min: number,
          // max: number,
          // pattern: any
        },
      },
      {
        type: 'input',
        field: 'message',
        numberOfLines: 3,
        label: I18n.t('MESSAGE'),
        model: I18n.t('INVITE_TO_CARD__SAMPLE_EMAIL'),
        validation: {
          required: true,
        },
      },
      {
        type: 'dropdown',
        field: 'boardPermission',
        label: I18n.t('BOARD_PERMISSION'),
        enum: 'BoardPermission',
        nullable: true,
        validation: {
          required: true,
        },
      }
    ];
    Alert.prompt('INVITE', undefined, form, [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("SEND_INVITATION"),
        onPress: model => {
        //  TODO: send invitation
          model.people = [model.email];
          model.targetId = this.props.boardId;
        //  /user/invite/to-board/, model
        },
      }
    ]);
  };
  renderHeader = () => {
    return (
      <Button
        onPress={this.addMember}
        style={[GS.mx3, GS.my2]}
        block
        primary
        bordered
      >
        <Text>{I18n.t("INVITE")}</Text>
      </Button>
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
        <View bg1 style={Styles.container}>
          <View bg2 style={Styles.header}>
            <Body>
              <Text mute>{this.props.title || I18n.t("MEMBERS")}</Text>
            </Body>
          </View>
          <TouchableOpacity activeOpacity={1} style={Styles.pickerContainer}>
            <FlatList
              contentContainerStyle={GS.flexGrow1}
              data={this.props.data}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              ListHeaderComponent={this.renderHeader}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
