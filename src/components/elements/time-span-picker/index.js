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
const pickers = [
  {
    title: "DAYS",
    field: "days",
    maxValue: 365
  },
  {
    title: "HOURS",
    field: "hours",
    maxValue: 24
  },
  {
    title: "MINUTES",
    field: "minutes",
    maxValue: 60
  },
  {
    title: "SECONDS",
    field: "seconds",
    maxValue: 60
  }
];
class TimeSpanPicker extends Component {
  static propTypes = {
    model: PropTypes.number,
    modelChange: PropTypes.func
    // hours: PropTypes.number,
    // minutes: PropTypes.number,
    // onHoursChanged: PropTypes.func,
    // onMinutesChanged: PropTypes.func,
  };
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  getTimeObject = num => {
    let seconds = Math.floor(num / 10000000);
    let days = Math.floor(seconds / 60 / 60 / 24);
    seconds = seconds % (days * 60 * 60 * 24);
    let hours = Math.floor(seconds / 60 / 60);
    seconds = seconds % (hours * 60 * 60);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % (minutes * 60);
    return {
      seconds,
      minutes,
      hours,
      days
    };
  };
  componentDidMount() {
    if (this.props.model) {
      const model = this.getTimeObject(this.props.model);
      this.setState(model);
    }
  }
  onModelChange = (field, val) => {
    const state = {};
    state[field] = val;
    this.setState(state);
    if (this.props.modelChange) {
      const { days, hours, minutes, seconds } = this.state;
      const value =
        (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 10000000;
      this.props.modelChange(value);
    }
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={stopDefault}
        style={Styles.container}
      >
        {pickers.map((p, idx) => (
          <React.Fragment key={p.field}>
            {idx !== 0 ? (
              <View style={Styles.pickerWrapper}>
                <Text style={Styles.divider}>:</Text>
              </View>
            ) : null}
            <View style={Styles.pickerWrapper}>
              <Text>{I18n.t(p.title)}</Text>
              <Picker
                style={Styles.picker}
                // itemStyle={[Styles.pickerItem, this.props.style.colorText_1]}
                itemStyle={this.props.style.colorText_1}
                selectedValue={this.state[p.field]}
                onValueChange={v => this.onModelChange(p.field, v)}
              >
                {Array(p.maxValue)
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
          </React.Fragment>
        ))}
      </TouchableOpacity>
    );
  }
}

export default connectStyle("Custom.GeneralColors")(TimeSpanPicker);
