import React, { Component } from "react";
import { View } from "native-base";
import GS from "../../themes/general-styles";
import PropTypes from "prop-types";
import Thumbnail from "../elements/thumbnail";
import { makeArray } from "../../library/general-helpers";
import RainbowService from "../../services/rainbow-service";

export default class MembersComponent extends Component {
  static propTypes = {
    items: PropTypes.any,
    style: PropTypes.any,
    itemsStyle: PropTypes.any,
    maxShown: PropTypes.number,
    small: PropTypes.bool
  };
  renderExtra() {
    if ((this.props.items || []).length > (this.props.maxShown || 3)) {
      return (
        <Thumbnail
          style={this.props.itemsStyle}
          extraSmall={!this.props.small}
          small={this.props.small}
          title={`+${this.props.items.length - (this.props.maxShown || 3)}`}
        />
      );
    }
  }

  render() {
    return (
      <View style={[GS.flexRowDir, ...makeArray(this.props.style)]}>
        {(this.props.items || []).map((member, index) => {
          if (index < (this.props.maxShown || 3)) {
            return (
              <Thumbnail
                  color={"#ffffff"}
                  backgroundColor={RainbowService.get(member.id)}
                style={this.props.itemsStyle}
                key={member.id}
                extraSmall={!this.props.small}
                small={this.props.small}
                title={member.initials}
                source={member.avatar}
              />
            );
          }
        })}
        {this.renderExtra()}
      </View>
    );
  }
}
