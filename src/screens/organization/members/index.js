import React, { Component } from "react";
import Alert from "../../../services/alert-service";
import { View, Text, Container } from "native-base";
import I18n from "../../../i18n";
import Styles from "./styles";
import Thumbnail from "../../../components/elements/thumbnail";
import { connect } from "react-redux";
import { BoardPermission } from "../../../library/enums";
import IdentityService from "../../../services/identity-service";
import UserItem from "../../../components/user-item";
import GS from "../../../themes/general-styles";
import { FlatList } from "react-native";
import SimpleHeaderComponent from "../../../components/simple-header";

class OrganizationMembersScreen extends Component {
  id = this.props.navigation.getParam("id");
  organ = this.props.dataSource.organizations.find(t => t.id === this.id);
  permission =
    this.organ.userId === IdentityService.userId ? BoardPermission.Admin : null;

  removeUser = item => {
    Alert.confirm(
      "REMOVE_FROM_ORGANIZATION_DESCRIPTION",
      "REMOVE_FROM_ORGANIZATION",
      [
        {
          text: I18n.t("CANCEL"),
          style: "cancel"
        },
        {
          text: I18n.t("REMOVE"),
          onPress: () => {},
          style: "destructive"
        }
      ]
    );
  };
  renderItem = ({ item }) => {
    item.boardPermission =
      this.organ.userId === item.id ? BoardPermission.Admin : null;
    return (
      <UserItem
        data={item}
        permission={this.permission}
        onRemoveUser={() => this.removeUser(item)}
        isOnlyAdmin={true}
        organ
      />
    );
  };
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          title={I18n.t("MEMBERS")}
          navigation={this.props.navigation}
        />
        <FlatList
          style={GS.zIndexM}
          contentContainerStyle={[GS.flexGrow1, GS.px2, GS.py2]}
          data={this.organ.members}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.organization
});
export default connect(mapStateToProps, null)(OrganizationMembersScreen);
