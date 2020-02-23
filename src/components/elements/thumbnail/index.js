import React, { Component } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { View, Icon, Text, Button, connectStyle } from "native-base";
import Image from "../image";
import PropTypes from "prop-types";
import Styles from "./styles";
import Initials from "../initials";
import Svg from "../svg";
const { string, object, bool, any, shape, func, oneOf, oneOfType } = PropTypes;

class Thumbnail extends Component {
  static propTypes = {
    source: any,
    fallback: any,
    large: bool,
    small: bool,
    extraSmall: bool,
    square: bool,
    title: string,
    color: string,
    fontSize: string,
    backgroundColor: string,
    icon: shape({
      name: string,
      type: string
    }),
    showEditButton: bool,
    onEditPress: func,
    onLongPress: func,
    onPress: func,
    status: oneOf(["success", "warning", "danger", "mute"]),
    contentContainerStyle: any,
    prefix: bool,
    waiting: bool
  };
  iconStyles = [
    Styles.icon,
    {
      fontSize:
        this.props.fontSize ||
        (this.props.large
          ? 45
          : this.props.small
          ? 30
          : this.props.extraSmall
          ? 17
          : 35),
      color: this.props.color || this.props.style.color
    }
  ];
  textStyles = [
    Styles.text,
    {
      fontSize:
        this.props.fontSize ||
        (this.props.large
          ? 40
          : this.props.small
          ? 20
          : this.props.extraSmall
          ? 15
          : 30),
      color: this.props.color || this.props.style.color
    }
  ];
  editBtnStyles = [
    Styles.editBtn,
    {
      width: this.props.large
        ? 30
        : this.props.small
        ? 23
        : this.props.extraSmall
        ? 20
        : 25,
      height: this.props.large
        ? 30
        : this.props.small
        ? 23
        : this.props.extraSmall
        ? 20
        : 25,
      bottom: this.props.large
        ? 0
        : this.props.small
        ? -4
        : this.props.extraSmall
        ? -3
        : -5,
      right: this.props.large
        ? 0
        : this.props.small
        ? -4
        : this.props.extraSmall
        ? -3
        : -5
    }
  ];
  editBtnIconStyles = [
    Styles.editBtnIcon,
    {
      fontSize: this.props.large
        ? 20
        : this.props.small
        ? 16
        : this.props.extraSmall
        ? 15
        : 18
    }
  ];
  statusStyles = [
    Styles.status,
    {
      width: this.props.large
        ? 22
        : this.props.small
        ? 15
        : this.props.extraSmall
        ? 12
        : 18,
      height: this.props.large
        ? 22
        : this.props.small
        ? 15
        : this.props.extraSmall
        ? 12
        : 18,
      borderRadius: this.props.large
        ? 11
        : this.props.small
        ? 7.5
        : this.props.extraSmall
        ? 6
        : 9,
      backgroundColor: this.getStatusColor(),
      borderWidth: this.props.extraSmall ? 1 : 2,
      borderColor: "#fff"
    }
  ];
  statusInnerStyles = {
    width: this.props.large
      ? 10
      : this.props.small
      ? 6
      : this.props.extraSmall
      ? 5
      : 8,
    height: this.props.large
      ? 10
      : this.props.small
      ? 6
      : this.props.extraSmall
      ? 5
      : 8,
    borderRadius: this.props.large
      ? 5
      : this.props.small
      ? 3
      : this.props.extraSmall
      ? 2.5
      : 4,
    backgroundColor: "#fff"
  };
  activeOpacity = this.props.onPress || this.props.onLongPress ? 0.7 : 1;

  onLongPress = () => {
    if (this.props.onLongPress) {
      this.props.onLongPress();
    }
  };
  onPress = e => {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  };
  onEditPress = () => {
    if (this.props.showEditButton && this.props.onEditPress) {
      this.props.onEditPress();
    }
  };
  getStatusColor() {
    switch (this.props.status) {
      case "danger":
        return "#ff0000";
      case "mute":
        return "#c8c8c8";
      case "success":
        return "#00ea0e";
      case "warning":
        return "#fff600";
    }
  }

  render() {
    return (
      <View style={[Styles.mainContainer, this.props.contentContainerStyle]}>
        <TouchableOpacity
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          activeOpacity={this.activeOpacity}
          style={[
            this.props.style,
            this.props.backgroundColor
              ? { backgroundColor: this.props.backgroundColor }
              : null
          ]}
        >
          {this.props.waiting ? (
            <ActivityIndicator
              style={Styles.image}
              color={this.props.color || "#fff"}
              size={
                this.props.small || this.props.extraSmall ? "small" : "large"
              }
            />
          ) : this.props.icon ? (
            this.props.icon.type ? (
              <Icon
                style={this.iconStyles}
                name={this.props.icon.name}
                type={this.props.icon.type}
              />
            ) : (
              <Svg wrapperStyle={this.iconStyles} name={this.props.icon.name} />
            )
          ) : this.props.title ? (
            <Initials style={this.textStyles}>{this.props.title}</Initials>
          ) : null}
          {!this.props.waiting && (this.props.source || this.props.fallback) ? (
            <Image
              containerStyle={Styles.image}
              style={Styles.image}
              fallback={this.props.fallback}
              small={this.props.small || this.props.extraSmall}
              waitingColor={this.props.color || "#fff"}
              source={this.props.source}
            />
          ) : null}
        </TouchableOpacity>
        {this.props.showEditButton ? (
          <Button
            onPress={this.onEditPress}
            style={this.editBtnStyles}
            light
            rounded
            small
          >
            <Icon
              style={this.editBtnIconStyles}
              name="pencil"
              type="MaterialCommunityIcons"
            />
          </Button>
        ) : this.props.status ? (
          <View style={this.statusStyles}>
            <View style={this.statusInnerStyles} />
          </View>
        ) : null}
      </View>
    );
  }
}
export default connectStyle("Custom.Thumbnail")(Thumbnail);
