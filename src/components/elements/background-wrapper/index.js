import React from "react";
import { ImageBackground } from "react-native";
import Constants from "../../../library/constants";
import { View } from "native-base";
import PropTypes from "prop-types";

const BackgroundWrapper = props => {
  if (props.picture) {
    return (
      <ImageBackground
        style={props.style}
        source={{ uri: Constants.BASE_URL + props.picture }}
      >
        {props.children}
      </ImageBackground>
    );
  }
  return (
    <View style={[props.style, { backgroundColor: props.color }]}>
      {props.children}
    </View>
  );
};
const { any, string, bool } = PropTypes;
BackgroundWrapper.propTypes = {
  style: any,
  picture: string,
  color: string,
  dark: bool
};
export default BackgroundWrapper;
