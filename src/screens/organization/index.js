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
import OrganizationGraphScreen from "./graph";
import OrganizationMembersScreen from "./members";
import OrganizationBoardsScreen from "./boards";
import OrganizationReportsScreen from "./reports";
import OrganizationOperationsScreen from "./operations";
import OrganizationSettingsScreen from "./settings";
import OrganizationFAQScreen from "./faq";
import I18n from "../../i18n";
import DeviceService from "../../services/device-service";
import GS from "../../themes/general-styles";
import { SafeAreaView } from "react-native";
import Thumbnail from "../../components/elements/thumbnail";
import NavigationList from "../../components/navigation-list";
import { connect } from "react-redux";
import SimpleHeaderComponent from "../../components/simple-header";
import IdentityService from "../../services/identity-service";

class OrganizationScreen extends Component {
  id = "";
  isAdmin: false;
  list = [];
  componentWillMount(): void {
    this.id = this.props.navigation.getParam("id");
    this.isAdmin = this.props.navigation.getParam("userId") === IdentityService.userId;
    const data = {
      id: this.id,
      isAdmin: this.isAdmin
    };
    this.list = [
      {
        route: "OrganizationGraphScreen",
        title: I18n.t("GRAPH"),
        iconName: "organization",
        data
      },
      {
        route: "OrganizationMembersScreen",
        title: I18n.t("MEMBERS"),
        iconName: "members",
        data
      },
      {
        route: "OrganizationBoardsScreen",
        title: I18n.t("BOARDS"),
        iconName: "board",
        data
      },
      {
        route: "OrganizationReportsScreen",
        title: I18n.t("REPORTS"),
        iconName: "statics",
        data
      },
      {
        route: "OrganizationOperationsScreen",
        title: I18n.t("OPERATIONS"),
        iconName: "check",
        data
      },
      {
        route: "OrganizationSettings",
        title: I18n.t("SETTINGS"),
        iconName: "settings",
        data
      },
      {
        route: "OrganizationFAQScreen",
        title: I18n.t("FAQ"),
        iconName: "help",
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
    const organ = this.props.dataSource.organizations.find(
      t => t.id === this.id
    );
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("ORGANIZATION")}
        />
        <Content>
          <View style={GS.py2}>
            <View style={[GS.alignItemsCenter, GS.px2, GS.py3]}>
              <Thumbnail
                contentContainerStyle={GS.my2}
                onPress={this.changeAvatar}
                source={organ.logo}
                title={organ.title}
                large
              />
              <>
                <Text style={[GS.textCenter, Styles.name]}>{organ.title}</Text>
                {organ.description ? (
                  <Text style={[GS.textCenter, Styles.bio]} note>
                    {organ.description}
                  </Text>
                ) : null}
              </>
            </View>
            <NavigationList
              navigation={this.props.navigation}
              data={this.list}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.organization
});
export default connect(mapStateToProps, null)(OrganizationScreen);
