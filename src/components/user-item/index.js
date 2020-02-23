import React, { Component } from "react";
import { TouchableOpacity, Picker } from "react-native";
import {
  Card,
  CardItem,
  View,
  Left,
  Body,
  Button,
  Icon,
  Text,
  connectStyle
} from "native-base";
import I18n from "../../i18n";
import PropTypes from "prop-types";
import Thumbnail from "../elements/thumbnail";
import GS from "../../themes/general-styles";
import { MemberItemDTO } from "../../dtos/board.dtos";
import { BoardPermission } from "../../library/enums";
import DropDown from "../elements/drop-down";
import IdentityService from "../../services/identity-service";

class UserItem extends Component {
  static defaultProps = {
    onPermissionChange: () => {},
  };
  state = {
    permission: this.props.data.boardPermission
  };
  labelStyles = [
    GS.badgeLabel,
    I18n.isRtl ? GS.ms2 : GS.me2,
    this.props.style.backBg_3
  ];
  canChange =
    this.props.permission === BoardPermission.Admin &&
    !(this.props.isOnlyAdmin && this.props.data.id === IdentityService.userId);
  onChangePermission = permission => {
    this.setState({ permission });
    this.props.onPermissionChange(permission);
  };

  render() {
    return (
      <Card noShadow noBorder transparent>
        <TouchableOpacity activeOpacity={0.85}>
          <CardItem dir thumbnail>
            <Left>
              <Thumbnail title={this.props.data.initials} small />
            </Left>
            <Body
              style={[
                GS.flexRowDir,
                GS.alignItemsCenter,
                I18n.isRtl ? GS.ps0 : GS.pe0
              ]}
            >
              <View style={[GS.flex1, GS.flexShrink1]}>
                <Text numberOfLines={1}>{this.props.data.fullName}</Text>
              </View>
              {this.props.data.boardPermission ? (
                this.canChange ? (
                  <View style={{ width: 100 }}>
                    <DropDown
                      enum="BoardPermission"
                      mode={"dropdown"}
                      selectedValue={this.state.permission}
                      onValueChange={this.onChangePermission}
                    />
                  </View>
                ) : (
                  <View style={this.labelStyles}>
                    <Text style={this.props.style.colorText_2}>
                      {I18n.enum(
                        "BoardPermission",
                        this.props.data.boardPermission
                      )}
                    </Text>
                  </View>
                )
              ) : null}
              {this.props.onRemoveUser && this.canChange ? (
                <Button
                  onPress={this.props.onRemoveUser}
                  style={[GS.alignSelfCenter, GS.justifyContentCenter]}
                  dark
                  transparent
                >
                  <Icon
                    style={[GS.mx0, { fontSize: 30 }]}
                    name="trash"
                    type="EvilIcons"
                  />
                </Button>
              ) : null}
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }
}

UserItem.propTypes = {
  data: PropTypes.shape(MemberItemDTO),
  permission: PropTypes.oneOf([0, ...Object.values(BoardPermission)]),
  isOnlyAdmin: PropTypes.bool,
  onPermissionChange: PropTypes.func,
  onRemoveUser: PropTypes.func,
  organ: PropTypes.bool
};

export default connectStyle("Custom.GeneralColors")(UserItem);
