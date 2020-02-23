import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Input, View, Badge, Text, Icon, Button } from "native-base";
import PropTypes from "prop-types";
import GS from "../../../themes/general-styles";
import Styles from "./styles";

class Tags extends Component {
  state = {
    model: [],
    input: ""
  };
  setModel = model => {
    if (typeof model === "string") {
      model = model.split(";").filter(i => i !== "");
    }
    this.setState({ model });
  };
  componentDidMount() {
    this.setModel(this.props.model);
  }
  componentDidUpdate(prevProps) {
    const { model } = this.props;
    if (model !== prevProps.model && model !== this.state.model) {
      this.setModel(model);
    }
  }
  modelChange = model => {
    if (!this.props.modelChange) {
      return;
    }
    if (this.props.stringOutput) {
      const newModel = model.join(";");
      this.props.modelChange(newModel);
      return;
    }
    this.props.modelChange(model);
  };
  addItem = () => {
    let input = this.state.input.trim();
    this.setState({ input: "" });
    if (input === "" || input === ";") {
      return;
    }
    input = input.split(";").join(" ");
    const model = [...this.state.model];
    const duplicate = model.findIndex(i => i === input) !== -1;
    if (duplicate) {
      return;
    }
    model.push(input);
    this.setState({ model });
    this.modelChange(model);
  };
  removeTag = index => {
    const model = [...this.state.model];
    model.splice(index, 1);
    this.setState({ model });
    this.modelChange(model);
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.refs.input.wrappedInstance.focus()}
        activeOpacity={1}
        style={[GS.flex1, GS.flexRowDir, GS.flexWrap, { paddingBottom: 50 }]}
      >
        {this.state.model.map((tag, index) => {
          return (
            <View style={[GS.px1, GS.py1, { maxWidth: "90%" }]} key={tag}>
              <Badge style={GS.alignSelfCenter}>
                <Text numberOfLines={1}>{tag}</Text>
                <TouchableOpacity
                  style={GS.flexShrink0}
                  onPress={() => this.removeTag(index)}
                >
                  <Icon name="close" type="MaterialIcons" />
                </TouchableOpacity>
              </Badge>
            </View>
          );
        })}
        <Input
          ref="input"
          returnKeyType="done"
          style={Styles.input}
          value={this.state.input}
          onChangeText={input => this.setState({ input })}
          blurOnSubmit={false}
          onSubmitEditing={this.addItem}
        />
      </TouchableOpacity>
    );
  }
}

const { oneOfType, string, arrayOf, func, bool } = PropTypes;
Tags.propTypes = {
  model: oneOfType([string, arrayOf(string)]),
  modelChange: func,
  stringOutput: bool
};

export default Tags;
