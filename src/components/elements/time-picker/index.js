import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, connectStyle } from "native-base";
import I18n from "../../../i18n";
import Picker from "react-native-wheel-picker";
import Styles from "./styles";
import PropTypes from "prop-types";

const stopDefault = e => {
  e.stopPropagation();
  e.preventDefault();
};

class TimePicker extends Component {
  static propTypes = {
    hours: PropTypes.number,
    minutes: PropTypes.number,
    onHoursChanged: PropTypes.func,
    onMinutesChanged: PropTypes.func
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={stopDefault}
        style={Styles.container}
      >
        <View style={Styles.pickerWrapper}>
          <Text>{I18n.t("HOURS")}</Text>
          <Picker
            style={Styles.picker}
            // itemStyle={[Styles.pickerItem, this.props.style.colorText_1]}
            itemStyle={this.props.style.colorText_1}
            selectedValue={this.props.hours}
            onValueChange={this.props.onHoursChanged}
          >
            {Array(24)
              .fill(0)
              .map((_, i) => (
                <Picker.Item
                  key={i.toString()}
                  label={i.toString()}
                  value={i}
                />
              ))}
          </Picker>
        </View>
        <View style={Styles.pickerWrapper}>
          <Text style={Styles.divider}>:</Text>
        </View>
        <View style={Styles.pickerWrapper}>
          <Text>{I18n.t("MINUTES")}</Text>
          <Picker
            style={Styles.picker}
            // itemStyle={[Styles.pickerItem, this.props.style.colorText_1]}
            itemStyle={this.props.style.colorText_1}
            selectedValue={this.props.minutes}
            onValueChange={this.props.onMinutesChanged}
          >
            {Array(60)
              .fill(0)
              .map((_, i) => (
                <Picker.Item
                  key={i.toString()}
                  label={i.toString()}
                  value={i}
                />
              ))}
          </Picker>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connectStyle("Custom.GeneralColors")(TimePicker);
