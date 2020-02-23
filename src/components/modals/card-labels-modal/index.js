import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
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
import { LabelDTO, MemberItemDTO } from "../../../dtos/board.dtos";
import { BoardPermission } from "../../../library/enums";
import { Metrics } from "../../../themes/variables";
import LabelsComponent from "../../labels";

class CardLabelsModal extends Component {
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
        <View bg1>
          <View bg2 style={[Styles.header, GS.mt3]}>
            <Text mute style={Styles.headerTitle}>
              {I18n.t("LABELS")}
            </Text>
          </View>
          <ScrollView
            style={{ maxHeight: Metrics.HEIGHT - Metrics.modalHeader }}
          >
            <View padder>
              <LabelsComponent
                boardId={this.props.boardId}
                cardLabels={this.props.labels}
                onToggleLabel={this.onToggleLabel}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}
const { string, arrayOf, shape } = PropTypes;
CardLabelsModal.propTypes = {
  boardId: string,
  cardId: string,
  labels: arrayOf(shape(LabelDTO))
};

export default CardLabelsModal;
