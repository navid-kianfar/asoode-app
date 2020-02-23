import React, { Component } from "react";
import { FlatList } from "react-native";
import {Button, Container, Text} from "native-base";
import Styles from "./styles";
import { connect } from "react-redux";
import UserItem from "../../../components/user-item";
import GS from "../../../themes/general-styles";
import { BoardPermission } from "../../../library/enums";
import IdentityService from "../../../services/identity-service";
import SimpleHeaderComponent from "../../../components/simple-header";
import I18n from "../../../i18n";
import Alert from "../../../services/alert-service";

class TeamMembersScreen extends Component {
  id = this.props.navigation.getParam("id");
  team = this.props.dataSource.teams.find(t => t.id === this.id);
  admins = this.team.members.filter(
    m => m.boardPermission === BoardPermission.Admin
  );
  permission = this.team.members.find(a => a.id === IdentityService.userId)
    .boardPermission;

  addMember = () => {
    const form = [
      {
        type: 'input',
        field: 'email',
        label: I18n.t('EMAIL'),
        //  TODO: validate email
        validation: {
          required: true,
          // min: number,
          // max: number,
          // pattern: any
        },
      },
      {
        type: 'input',
        field: 'message',
        numberOfLines: 3,
        label: I18n.t('MESSAGE'),
        model: I18n.t('INVITE_TO_CARD__SAMPLE_EMAIL'),
        validation: {
          required: true,
        },
      },
      {
        type: 'dropdown',
        field: 'boardPermission',
        label: I18n.t('BOARD_PERMISSION'),
        enum: 'BoardPermission',
        nullable: true,
        validation: {
          required: true,
        },
      }
    ];
    Alert.prompt('INVITE', undefined, form, [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("SEND_INVITATION"),
        onPress: model => {
          //  TODO: send invitation
          model.people = [model.email];
          model.targetId = this.props.boardId;
          //  /user/invite/to-team/, model
        },
      }
    ]);
  };
  renderItem = ({ item }) => {
    return (
      <UserItem
        data={item}
        permission={this.permission}
        onRemoveUser={() => alert("remove user")}
        onPermissionChange={() => alert("change permission")}
        isOnlyAdmin={this.admins.length === 1}
      />
    );
  };
  renderHeader = () => {
    return (
      <Button
        onPress={this.addMember}
        style={[GS.mx3, GS.my2]}
        block
        primary
        bordered
      >
        <Text>{I18n.t("INVITE")}</Text>
      </Button>
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
          data={this.team.members}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.team
});
export default connect(mapStateToProps, null)(TeamMembersScreen);
