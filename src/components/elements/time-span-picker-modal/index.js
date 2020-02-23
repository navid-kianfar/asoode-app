import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import Modal from "../modal";
import {
  View,
  Text,
  Button,
  Icon,
  Body,
  Right,
  Left,
  connectStyle
} from "native-base";
import I18n from "../../../i18n";
import PropTypes from "prop-types";
import Styles from "./styles";
import TimeSpanPicker from "../time-span-picker";

class TimeSpanPickerModal extends Component {
  static propTypes = {
    update: PropTypes.func,
    model: PropTypes.any,
    min: PropTypes.any,
    max: PropTypes.any,
    from: PropTypes.any,
    to: PropTypes.any,
    title: PropTypes.string,
    time: PropTypes.bool
  };
  state = {
    visible: false,
    model: null
  };
  open = () => {
    this.setState({ visible: true });
  };
  close = () => {
    this.setState({
      visible: false
    });
  };
  updateMinutes = value => {
    const unix = (this.state.model || new Date()).getTime();
    const date = new Date(unix);
    date.setMinutes(value);
    this.setModel(date);
  };
  updateHours = value => {
    const unix = (this.state.model || new Date()).getTime();
    const date = new Date(unix);
    date.setHours(value);
    this.setModel(date);
  };
  setModel = model => {
    this.setState({ model });
    // if (this.props.update) this.props.update(model);
  };
  pickAndClose = () => {
    this.setState({ visible: false });
    if (this.props.update) {
      const date = this.state.model
        ? this.state.model.datetime
        : this.props.model;
      this.props.update(date);
    }
  };
  render() {
    const time = this.props.model || new Date();
    return (
      <>
        {this.props.children?.onPress ? (
          this.props.children
        ) : (
          <TouchableOpacity
            style={this.props.style}
            activeOpacity={0.7}
            onPress={this.open}
          >
            {this.props.children ? (
              this.props.children
            ) : (
              <Text>Backup Button</Text>
            )}
          </TouchableOpacity>
        )}
        <Modal
          style={Styles.modal}
          isVisible={this.state.visible}
          onBackdropPress={this.close}
          onSwipeComplete={this.close}
          swipeDirection="down"
          propagateSwipe
        >
          <View style={[Styles.container, this.props.style.backBg_1]}>
            <View style={[Styles.header, this.props.style.backBg_2]}>
              <Left />
              <Body>
                <Text mute>{this.props.title || I18n.t("SET_DATE")}</Text>
              </Body>
              <Right>
                <Button onPress={this.pickAndClose} transparent>
                  <Text style={Styles.doneText} uppercase={false}>
                    {I18n.t("DONE")}
                  </Text>
                </Button>
              </Right>
            </View>
            <View style={Styles.pickerContainer}>
              <TimeSpanPicker
              // model={}
              // modelChange={}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default connectStyle("Custom.GeneralColors")(TimeSpanPickerModal);
