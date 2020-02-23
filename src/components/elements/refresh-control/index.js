import React, { Component } from "react";
import { RefreshControl as RNControl } from "react-native";
import { connectStyle } from "native-base";
import PropTypes from "prop-types";

class RefreshControl extends Component {
  render() {
    return (
      <RNControl {...this.props} tintColor={this.props.style.colorText_1} />
    );
  }
}
RefreshControl.propTypes = {
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func
};

export default connectStyle("Custom.GeneralColors")(RefreshControl);
