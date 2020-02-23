import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import Modal from "../../elements/modal";
import Styles from "../attachment-modal/styles";
import {
  Body,
  Button,
  Card,
  Right,
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
import {
  CustomFieldDTO,
  LabelDTO,
  MemberItemDTO
} from "../../../dtos/board.dtos";
import { BoardPermission } from "../../../library/enums";
import { Metrics } from "../../../themes/variables";
import LabelsComponent from "../../labels";
import BoardCustomFields from "../../board-custom-fields";

class CustomFieldModal extends Component {
  state = {
    visible: false
  };
  close = () => {
    this.setState({ visible: false });
  };
  open = () => {
    this.setState({ visible: true });
  };
  onToggleLabel = id => {
    // '/user/cards/label-toggle/' + this.props.cardId, {id}
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
        <BoardCustomFields
          boardId={this.props.boardId}
          customFields={this.props.customFields}
          modal
        />
      </Modal>
    );
  }
}
const { string, arrayOf, shape } = PropTypes;
CustomFieldModal.propTypes = {
  boardId: string,
  customFields: arrayOf(shape(CustomFieldDTO))
};

export default CustomFieldModal;
