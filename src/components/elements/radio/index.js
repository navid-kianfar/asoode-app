import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Radio as RadioNB, View, Text, connectStyle } from "native-base";
import GS from "../../../themes/general-styles";
import PropTypes from "prop-types";
import * as Enums from "../../../library/enums";
import I18n from "../../../i18n";
import { Colors } from "../../../themes/variables";
import { makeArray } from "../../../library/general-helpers";

class Radio extends Component {
  state = {
    model: this.props.model,
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
        text: I18n.enum(this.props.enum, myEnum[item]),
        value: myEnum[item]
      }));
    } else {
      items = [...this.props.items];
    }
    this.setState({ items });
  }
  componentDidUpdate(prevProps) {
    const { model, items } = this.props;
    if (model !== prevProps.model && model !== this.state.model) {
      this.setState({ model });
    }
    if (items !== prevProps.items) {
      this.setState({ items: [...items] });
    }
  }
  modelChange = model => {
    this.setState({ model });
    if (this.props.modelChange) {
      this.props.modelChange(model);
    }
  };
  render() {
    return (
      <View
        style={[GS.alignItemsStartDir, ...makeArray(this.props.containerStyle)]}
      >
        {this.state.items.map(item => {
          const selected = this.state.model === item.value;
          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => this.modelChange(item.value)}
              activeOpacity={0.8}
              style={[
                GS.flexRowDir,
                GS.my1,
                ...makeArray(this.props.itemStyle)
              ]}
            >
              <RadioNB
                onPress={() => this.modelChange(item.value)}
                style={[GS.me2, GS.my1, ...makeArray(this.props.radioStyle)]}
                color={this.props.style.text_1}
                selectedColor={Colors.primary}
                selected={selected}
              />
              <Text style={this.props.textStyle}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const { arrayOf, shape, any, string, func } = PropTypes;
Radio.propTypes = {
  items: arrayOf(
    shape({
      value: any,
      text: string
    })
  ),
  model: any,
  modelChange: func,
  enum: string,
  containerStyle: any,
  itemStyle: any,
  radioStyle: any,
  textStyle: any
};

export default connectStyle("Custom.GeneralColors")(Radio);
