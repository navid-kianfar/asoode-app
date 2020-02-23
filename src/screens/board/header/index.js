import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, TouchableOpacity } from "react-native";
import {
  Body,
  View,
  Button,
  Header,
  Icon,
  Input,
  Left,
  Right,
  Title,
  connectStyle
} from "native-base";
import Styles from "../styles";
import GS from "../../../themes/general-styles";
import { StatusBar } from "react-native";
import { ChatCategory } from "../../../library/enums";
import { PLATFORM } from "../../../../native-base-theme/variables/commonColor";

class BoardHeader extends Component {
  goBack = () => {
    this.props.openChange();
    this.props.navigation.goBack(null);
  };
  openChat = () => {
    this.props.openChange();
    const item = {
      id: this.props.id,
      category: ChatCategory.Board,
      title: this.props.title
    };
    this.props.navigation.navigate("BoardChatScreen", item);
  };
  toggleDrawer = () => {
    this.props.openChange();
    this.props.drawer._root.toggle();
  };
  render() {
    return (
      <View style={[Styles.header, this.props.style.boardHeader]}>
        <Header transparent>
          <View style={[GS.flexRow, GS.flex1, GS.alignItemsCenter]}>
            <TouchableOpacity
              style={Styles.headerButton}
              activeOpacity={0.8}
              onPress={this.goBack}
            >
              <Icon style={GS.px0} name="chevron-left" type="Feather" />
            </TouchableOpacity>
            <Input
              style={Platform.OS === PLATFORM.IOS ? { maxHeight: 30 } : null}
              editable={this.props.isAdmin}
              value={this.props.title}
            />
            <TouchableOpacity
              onPress={this.openChat}
              style={Styles.headerButton}
              activeOpacity={0.8}
            >
              <Icon name="comment" type="EvilIcons" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleDrawer}
              style={Styles.headerButton}
              activeOpacity={0.8}
            >
              <Icon name="more-horizontal" type="Feather" />
            </TouchableOpacity>
          </View>
        </Header>
        <StatusBar
          translucent
          backgroundColor="#0000"
          barStyle="light-content"
        />
      </View>
    );
  }
}

BoardHeader.propTypes = {
  navigation: PropTypes.any,
  title: PropTypes.string,
  id: PropTypes.string,
  isAdmin: PropTypes.bool,
  openChange: PropTypes.func
};

export default connectStyle("Custom.GeneralColors")(BoardHeader);
