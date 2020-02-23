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
import DatePicker from "../date-picker";
import I18n from "../../../i18n";
import PropTypes from "prop-types";
import Styles from "./styles";
import TimePicker from "../time-picker";

export default class DatePickerModal extends Component {
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
    showTime: false,
    model: null
  };
  open = () => {
    this.setState({
      visible: true,
      showTime: false
    });
  };
  close = () => {
    this.setState({
      visible: false
    });
  };
  togglePickers = () => {
    this.setState({ showTime: !this.state.showTime });
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
          <View bg1 style={Styles.container}>
            <View bg2 style={Styles.header}>
              <Left>
                {this.props.time ? (
                  <Button onPress={this.togglePickers} transparent>
                    <Icon
                      name={this.state.showTime ? "calendar" : "clock"}
                      type="Feather"
                    />
                  </Button>
                ) : null}
              </Left>
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
              {this.state.showTime ? (
                <TimePicker
                  hours={time.getHours()}
                  minutes={time.getMinutes()}
                  onMinutesChanged={this.updateMinutes}
                  onHoursChanged={this.updateHours}
                />
              ) : (
                <DatePicker
                  min={this.props.min}
                  max={this.props.max}
                  from={this.props.from}
                  to={this.props.to}
                  update={this.setModel}
                  model={this.props.model}
                />
              )}
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
