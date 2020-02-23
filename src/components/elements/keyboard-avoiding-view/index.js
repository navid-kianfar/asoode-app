import React, { PureComponent } from "react";
import { KeyboardAvoidingView as DefaultView, Platform } from "react-native";
import GS from "../../../themes/general-styles";

export default class KeyboardAvoidingView extends PureComponent {
  render() {
    if (Platform.OS === "ios") {
      return (
        <DefaultView enabled style={GS.flex1} behavior="height">
          {this.props.children}
        </DefaultView>
      );
    }
    return this.props.children;
  }
}
