import React, { Component } from "react";
import { Image as DefaultImage, ActivityIndicator } from "react-native";
import { View } from "native-base";
import PropTypes from "prop-types";
import Constants from "../../../library/constants";
import Styles from "./styles";
const { string, object, bool, any, oneOf, oneOfType, array } = PropTypes;

export default class Image extends Component {
  static propTypes = {
    source: any,
    fallback: any,
    style: oneOfType([object, array]),
    containerStyle: oneOfType([object, array]),
    waitingColor: string,
    small: bool,
    resizeMode: oneOf(["contain", "cover", "stretch", "center", "repeat"])
  };
  state = { waiting: true };

  stopWaiting = () => {
    this.setState({ waiting: false });
  };
  render() {
    let source = this.props.source || this.props.fallback;
    if (
      this.props.source &&
      typeof this.props.source === "string" &&
      this.props.source[0] === "/"
    ) {
      source = { uri: Constants.BASE_URL + this.props.source };
    }
    return (
      <View style={[Styles.mainContainer, this.props.containerStyle]}>
        <ActivityIndicator
          style={Styles.waiting}
          color={this.props.waitingColor}
          size={this.props.small ? "small" : "large"}
          animating={this.state.waiting}
        />
        <DefaultImage
          onLoad={this.stopWaiting}
          style={this.props.style}
          source={source}
          resizeMode={this.props.resizeMode || "cover"}
        />
      </View>
    );
  }
}
