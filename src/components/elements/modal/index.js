import React, { Component } from "react";
import DefaultModal from "react-native-modal";
import { connectStyle } from "native-base";

class Modal extends Component {
  render() {
    return (
      <DefaultModal
        backdropOpacity={0.2}
        backdropColor={this.props.style.backdrop}
        {...this.props}
      >
        {this.props.children}
      </DefaultModal>
    );
  }
}

export default connectStyle("Custom.GeneralColors")(Modal);
