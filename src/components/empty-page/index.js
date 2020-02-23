import React from "react";
import { Image } from "react-native";
import { View, Button, Text, H2 } from "native-base";
import GeneralStyles from "../../themes/general-styles";
import PropTypes from "prop-types";
import Styles from "./styles";
import { Metrics } from "../../themes/variables";
const EmptyPageComponent = props => {
  const onPress = () => {
    if (props.handler) {
      props.handler();
    }
  };
  const ImageStyles = [
    {
      width: Metrics.WIDTH * 0.8,
      height: Metrics.WIDTH * 0.8 * props.imageHeightRatio
    },
    GeneralStyles.mb3
  ];
  return (
    <View style={Styles.notFound}>
      <View style={GeneralStyles.alignItemsCenter}>
        <Image style={ImageStyles} source={props.image} resizeMode="contain" />
        {props.header ? (
          <H2 style={GeneralStyles.mb2}>{props.header}</H2>
        ) : null}
        {props.description ? (
          <Text
            style={[
              GeneralStyles.mx5,
              GeneralStyles.textCenter,
              GeneralStyles.textMute
            ]}
          >
            {props.description}
          </Text>
        ) : null}
      </View>
      {props.buttonText ? (
        <Button onPress={onPress}>
          <Text>{props.buttonText}</Text>
        </Button>
      ) : null}
    </View>
  );
};
EmptyPageComponent.propTypes = {
  image: PropTypes.any,
  imageHeightRatio: PropTypes.number,
  header: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  handler: PropTypes.func
};

export default EmptyPageComponent;
