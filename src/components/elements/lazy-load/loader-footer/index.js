import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Button, Icon, Text, View } from "native-base";
import GS from "../../../../themes/general-styles";
import I18n from "../../../../i18n";
import PropTypes from "prop-types";

export default class LazyLoadFooter extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    fullScreen: PropTypes.bool,
    loadMore: PropTypes.func
  };
  render() {
    if (this.props.isLoading) {
      if (this.props.fullScreen) {
        return (
          <View style={[GS.waitingContainer]}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
      return <ActivityIndicator style={GS.my4} size="large" />;
    }
    if (this.props.hasMore) {
      return (
        <View style={GS.py3}>
          <Button onPress={this.props.loadMore} transparent block>
            <Icon name="reload1" type="AntDesign" />
            <Text style={{ fontSize: 20 }}>{I18n.t("LOAD_MORE")}</Text>
          </Button>
        </View>
      );
    }
    return null;
  }
}
