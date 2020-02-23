import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Container,
  Content,
  Card,
  Icon,
  Header,
  Left,
  Body,
  Title,
  Right
} from "native-base";
import Styles from "./styles";
import TeamBoardsScreen from "./boards";
import TeamMembersScreen from "./members";
import TeamSettingsScreen from "./settings";
import TeamArchivedBoardsScreen from "./archived-boards";
import I18n from "../../i18n";
import GS from "../../themes/general-styles";
import DeviceService from "../../services/device-service";
import Thumbnail from "../../components/elements/thumbnail";
import NavigationList from "../../components/navigation-list";
import { connect } from "react-redux";
import SimpleHeaderComponent from "../../components/simple-header";
import { BoardPermission } from "../../library/enums";
import IdentityService from "../../services/identity-service";

class TeamScreen extends Component {
  id = "";
  list = [];
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
    const data = { id: this.id };
    this.list = [
      {
        route: "TeamBoardsScreen",
        title: I18n.t("BOARDS"),
        iconName: "board",
        data
      },
      {
        route: "TeamMembersScreen",
        title: I18n.t("MEMBERS"),
        iconName: "members",
        data
      },
      {
        route: "TeamSettingsScreen",
        title: I18n.t("SETTINGS"),
        iconName: "settings",
        sensitive: true,
        data
      },
      {
        route: "TeamArchivedBoardsScreen",
        title: I18n.t("ARCHIVED_BOARDS"),
        iconName: "archive",
        data
      }
    ];
  }
  changeAvatar = () => {
    DeviceService.imagePicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(
      image => {
        console.log(image);
      },
      err => {
        console.log(err);
      }
    );
  };
  render() {
    const team = this.props.dataSource.teams.find(t => t.id === this.id);
    const permission = team.members.find(m => m.id === IdentityService.userId)
      .boardPermission;
    const isAdmin = permission === BoardPermission.Admin;
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("TEAM")}
        />
        <Content>
          <View style={GS.py2}>
            <View style={[GS.alignItemsCenter, GS.px2, GS.py3]}>
              <Thumbnail
                contentContainerStyle={GS.my2}
                onPress={isAdmin ? this.changeAvatar : null}
                source={team.logo}
                title={team.title}
                large
              />
              <>
                <Text style={[GS.textCenter, Styles.name]}>{team.title}</Text>
                {team.description ? (
                  <Text style={[GS.textCenter, Styles.bio]} note>
                    {team.description}
                  </Text>
                ) : null}
              </>
            </View>
            <NavigationList
              navigation={this.props.navigation}
              data={this.list}
              showSensitive={isAdmin}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.team
});
export default connect(mapStateToProps, null)(TeamScreen);
