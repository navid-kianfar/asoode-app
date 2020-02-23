import React, { Component } from 'react';
import Svg, { Circle } from "react-native-svg";
import PropTypes from 'prop-types';
import { Colors } from "../../../themes/variables";
import { View, Animated, Easing, StyleSheet, TouchableOpacity } from "react-native";
import {makeArray} from "../../../library/general-helpers";

class CircleProgress extends Component {
  static defaultProps = {
    model: 0,
    size: 50,
    thickness: 0.4,
    innerThickness: 0.3,
    fillColor: Colors.primary,
    fillFieldColor: '#0005',
  };
  spinValue = new Animated.Value(0);
  specialNumber = 15.91549430918954;

  componentDidMount() {
    if (this.props.spin) {
      Animated.loop(
        Animated.timing(this.spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }
  onPress = e => {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  };
  render() {
    const strokeDasharray = `${this.props.model || 0} ${100 - (this.props.model || 0)}`;
    const thickness = this.props.thickness * this.props.thickness;
    const innerThickness = this.props.innerThickness * this.props.innerThickness;
    const radius = this.specialNumber + this.specialNumber * thickness;

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const containerSize = {
      width: this.props.size,
      height: this.props.size
    };
    return (
      <TouchableOpacity
        style={[containerSize,...makeArray(this.props.containerStyle)]}
        onPress={this.onPress}
        activeOpacity={this.props.onPress ? 0.8 : 1}
      >
        <Animated.View style={{
          ...containerSize,
          transform: [{rotate: spin}]
        }}>
          <Svg width="100%" height="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
            <Circle
              cx={radius}
              cy={radius}
              r={this.specialNumber}
              fill="transparent"
              stroke={this.props.fillFieldColor}
              strokeWidth={this.specialNumber * thickness * 2}
            />
            <Circle
              cx={radius}
              cy={radius}
              r={this.specialNumber}
              fill="transparent"
              stroke={this.props.fillColor}
              strokeWidth={this.specialNumber * innerThickness * 2}
              strokeDasharray={strokeDasharray}
              strokeDashoffset="25"
            />
          </Svg>
        </Animated.View>
        {this.props.children ? (
          <View style={[styles.childrenContainer, ...makeArray(this.props.childrenContainerStyle)]}>
            {this.props.children}
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }
}

const { number, string, bool, any, oneOfType } = PropTypes;
CircleProgress.propTypes = {
  model: number,
  size: oneOfType([number, string]),
  thickness: number,/* between 0 and 1 */
  innerThickness: number,/* between 0 and 1 */
  fillColor: string,
  fillFieldColor: string,
  spin: bool,
  containerStyle: any,
  childrenContainerStyle: any,
};

const styles = StyleSheet.create({
  childrenContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CircleProgress;