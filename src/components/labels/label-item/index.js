import React, { Component } from "react";
import { Button, Icon, Input, View, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import Styles from "./styles";
import GS from "../../../themes/general-styles";
import PropTypes from "prop-types";
import { LayoutAnimation } from "react-native";

class LabelItem extends Component {
  startEdit = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.editingChange(true);
  };
  cancelEditing = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.editingChange(false);
  };
  submitEditing = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.editingChange(false);
  };
  onSelect = () => {
    if (this.props.cardLabel) {
      this.props.onSelect(this.props.data.id);
    }
  };
  render() {
    return (
      <View style={[GS.flexRowDir, GS.my1]}>
        <TouchableOpacity
          style={[
            Styles.label,
            GS.flexRowDir,
            { backgroundColor: this.props.data.value }
          ]}
          activeOpacity={this.props.cardLabel ? 0.85 : 1}
          onPress={this.onSelect}
        >
          {this.props.editing ? (
            <Input
              style={{ marginVertical: -10, color: "#fff" }}
              value={this.props.data.title}
              autoFocus
            />
          ) : (
            <Text style={[{ color: "#fff" }, GS.flex1]} input>
              {this.props.data.title}
            </Text>
          )}
          {this.props.checked ? (
            <Icon style={{ color: "#fff" }} name="check" type="Feather" />
          ) : null}
        </TouchableOpacity>
        {!this.props.cardLabel ? (
          this.props.editing ? (
            <>
              <Button onPress={this.cancelEditing} transparent>
                <Icon name="close" type="MaterialIcons" />
              </Button>
              <Button onPress={this.submitEditing} transparent>
                <Icon name="check" type="MaterialIcons" />
              </Button>
            </>
          ) : (
            <Button transparent onPress={this.startEdit}>
              <Icon name="edit" type="MaterialIcons" />
            </Button>
          )
        ) : null}
      </View>
    );
  }
}

const { shape, string, bool, func } = PropTypes;
LabelItem.propTypes = {
  data: shape({
    id: string,
    title: string,
    value: string,
    selected: bool
  }),
  editing: bool,
  editingChange: func,
  cardLabel: bool,
  checked: bool,
  onSelect: func
};
export default LabelItem;
