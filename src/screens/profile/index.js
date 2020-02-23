import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Left,
  Icon,
  Body,
  Right,
  View,
  Switch,
  List,
  ListItem,
  ActionSheet,
  Root
} from "native-base";
import Alert from "../../services/alert-service";
import DeviceService from "../../services/device-service";
import SocketService from "../../services/socket-service";
import Thumbnail from "../../components/elements/thumbnail";
import Styles from "./styles";
import GS from "../../themes/general-styles";
import ThemeService from "../../services/theme-service";
import IdentityService from "../../services/identity-service";
import I18n from "../../i18n";
import PersonalArchivedBoardsScreen from "./archived-boards";
import NavigationList from "../../components/navigation-list";
import { connect } from "react-redux";
import SimpleHeaderComponent from "../../components/simple-header";
import AsyncStorage from "@react-native-community/async-storage";

class ProfileScreen extends Component {
  list = [
    {
      route: "AccountScreen",
      title: I18n.t("ACCOUNT"),
      iconName: "user"
    },
    {
      route: "PersonalArchivedBoardsScreen",
      title: I18n.t("ARCHIVED_BOARDS"),
      iconName: "archive"
    },
    {
      route: "SupportScreen",
      title: I18n.t("SUPPORT"),
      iconName: "headset"
    },
    {
      route: "TransactionsScreen",
      title: I18n.t("TRANSACTIONS"),
      iconName: "us-dollar"
    }
  ];
  changeAvatar = () => {
    const CAMERA_INDEX = 0;
    const GALLERY_INDEX = 1;
    const DELETE_INDEX = 2;
    const CANCEL_INDEX = 3;
    const buttons = [
      I18n.t("CAMERA"),
      I18n.t("GALLERY"),
      I18n.t("DELETE"),
      I18n.t("CANCEL")
    ];
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DELETE_INDEX,
        title: I18n.t("CHANGE_PICTURE")
      },
      buttonIndex => {
        switch (buttonIndex) {
          case CAMERA_INDEX:
            DeviceService.imageCamera({
              width: 400,
              height: 400,
              cropping: true
            }).then(
              image => IdentityService.changeAvatar(image),
              err => Alert.error("CAMERA_PICK_FAILED")
            );
            break;
          case GALLERY_INDEX:
            DeviceService.imagePicker({
              width: 400,
              height: 400,
              cropping: true
            }).then(
              image => IdentityService.changeAvatar(image),
              err => Alert.error("GALLERY_PICK_FAILED")
            );
            break;
          case DELETE_INDEX:
            IdentityService.removeAvatar();
            break;
          case CANCEL_INDEX:
            break;
        }
      }
    );
  };
  logOut = () => {
    Alert.confirm("LOG_OUT_CONFIRM_MESSAGE", "LOG_OUT", [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("LOG_OUT"),
        style: "destructive",
        onPress: async () => {
          if (SocketService.socket) {
            SocketService.socket.disconnect(true);
          }
          await AsyncStorage.clear();
          this.props.navigation.navigate("Auth");
        }
      }
    ]);
  };
  render() {
    return (
      <Root>
        <Container>
          <SimpleHeaderComponent
            navigation={this.props.navigation}
            title={I18n.t("PROFILE")}
          />
          <Content>
            <View style={GS.py2}>
              <View style={[GS.alignItemsCenter, GS.px2, GS.py3]}>
                <Thumbnail
                  contentContainerStyle={GS.my2}
                  onPress={this.changeAvatar}
                  source={this.props.dataSource.profile?.avatar}
                  title={this.props.dataSource.profile?.initials}
                  waiting={this.props.dataSource.waiting}
                  large
                />
                {!this.props.dataSource.waiting ? (
                  <>
                    <Text style={[GS.textCenter, Styles.name]}>
                      {this.props.dataSource.profile.fullName}
                    </Text>
                    <Text style={[GS.textCenter, Styles.userName]} note>
                      {this.props.dataSource.profile.email}
                    </Text>
                    {this.props.dataSource.profile.bio ? (
                      <Text style={[GS.textCenter, Styles.bio]} note>
                        {this.props.dataSource.profile.bio}
                      </Text>
                    ) : null}
                  </>
                ) : null}
              </View>
              <NavigationList
                navigation={this.props.navigation}
                data={this.list}
              />
              <List>
                <ListItem itemDivider first last />
                <ListItem icon dir>
                  <Left>
                    <Icon
                      name="theme-light-dark"
                      type="MaterialCommunityIcons"
                    />
                  </Left>
                  <Body>
                    <Text>{I18n.t("DARK_THEME")}</Text>
                  </Body>
                  <Right>
                    <Switch
                      onValueChange={val => {
                        ThemeService.change(val, this.props.dispatch);
                      }}
                      value={this.props.dataSource.dark}
                    />
                  </Right>
                </ListItem>
                <ListItem itemDivider first last />
                <ListItem onPress={this.logOut} icon dir last>
                  <Left>
                    <Icon name="logout" type="MaterialCommunityIcons" />
                  </Left>
                  <Body>
                    <Text>{I18n.t("LOG_OUT_OF_ACCOUNT")}</Text>
                  </Body>
                </ListItem>
              </List>
            </View>
          </Content>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.auth
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
