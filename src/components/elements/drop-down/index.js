import React, { Component } from "react";
import { Picker } from "native-base";
import PropTypes from "prop-types";
import I18n from "../../../i18n";
import * as Enums from "../../../library/enums";

class DropDown extends Component {
  state = {
    rendered: false,
    items: []
  };
  componentDidMount() {
    let items = [];
    if (this.props.enum) {
      const myEnum = Enums[this.props.enum];
      if (!myEnum) {
        return;
      }
      items = Object.keys(myEnum).map(item => ({
        label: I18n.enum(this.props.enum, myEnum[item]),
        value: myEnum[item]
      }));
    } else {
      items = [...this.props.items];
    }
    this.checkNullable(items);
    this.setState({ items, rendered: true });
  }
  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (JSON.stringify(items) !== JSON.stringify(prevProps.items)) {
      const newItems = [...items];
      this.checkNullable(newItems);
      this.setState({ items: newItems });
    }
  }
  checkNullable(items) {
    if (this.props.nullable) {
      const found = items.find(i => i.value === undefined);
      if (found) {
        return;
      }
      items.unshift({
        label: I18n.t("PLEASE_CHOOSE"),
        value: undefined
      });
    }
  }
  render() {
    if (!this.state.rendered) {
      return null;
    }
    return (
      <Picker
        enabled={this.props.enabled !== undefined ? this.props.enabled : true}
        testID={this.props.testID}
        style={this.props.style}
        textStyle={this.props.textStyle}
        itemStyle={this.props.itemStyle}
        mode={this.props.mode}
        onValueChange={this.props.onValueChange}
        prompt={this.props.prompt}
        selectedValue={this.props.selectedValue}
        placeholder={this.props.placeholder}
        headerBackButtonText={I18n.t("BACK")}
        iosHeader={this.props.headerTitle || I18n.t("PLEASE_CHOOSE")}
      >
        {this.state.items.map(item => (
          <Picker.Item
            key={`${item.value}`}
            label={item.label || item.text}
            value={item.value}
            color={item.color}
            testID={item.testID}
          />
        ))}
      </Picker>
    );
  }
}

const {
  arrayOf,
  array,
  shape,
  string,
  bool,
  func,
  oneOf,
  any,
  oneOfType,
  object
} = PropTypes;
DropDown.propTypes = {
  items: arrayOf(
    shape({
      label: string,
      text: string,
      value: any,
      color: string,
      testID: string
    })
  ),
  enum: string,
  enabled: bool,
  nullable: bool,
  testID: string,
  style: oneOfType([object, array]),
  itemStyle: oneOfType([object, array]),
  mode: oneOf(["dialog", "dropdown"]),
  onValueChange: func, // (itemValue, itemPosition)
  prompt: string,
  selectedValue: any,
  placeholder: string,
  headerTitle: string
};

export default DropDown;
