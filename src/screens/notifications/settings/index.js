import React, { Component } from "react";
import {
  View,
  Text,
  Left,
  Body,
  ListItem,
  Container,
  Right,
  Button,
  Icon
} from "native-base";
import Alert from "../../../services/alert-service";
import Styles from "./styles";
import { connect } from "react-redux";
import { ActivityIndicator, FlatList, Image } from "react-native";
import RefreshControl from "../../../components/elements/refresh-control";
import NotificationService from "../../../services/notification-service";
import ActionNames from "../../../reducers/action-names";
import GS from "../../../themes/general-styles";
import I18n from "../../../i18n";
import ActivityItem from "../../../components/activity-item";
import Thumbnail from "../../../components/elements/thumbnail";
import SimpleHeaderComponent from "../../../components/simple-header";
const images = {
  backgroundDark: require("../../../assets/images/notification-devices-dark.png"),
  backgroundLight: require("../../../assets/images/notification-devices-light.png")
};
class NotificationsSettingsScreen extends Component {
  componentWillMount() {
    this.props.refresh(false);
  }
  silentDevice = item => {
    Alert.confirm(undefined, undefined, [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("TURN_OFF_NOTIFICATION"),
        onPress: () => console.log("TurnOff", item),
        style: "destructive"
      }
    ]);
  };
  removeDevice = item => {
    Alert.confirm(undefined, undefined, [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("REMOVE"),
        onPress: () => console.log("Remove", item),
        style: "destructive"
      }
    ]);
  };
  renderItem = ({ item, index }) => {
    let image;
    if (item.desktop) {
      switch (item.platform) {
        case "linux":
          image = "/assets/images/app/panel/devices/devices_linux.png";
          break;
        case "mac":
          image = "/assets/images/app/panel/devices/devices_osx.png";
          break;
        default:
          image = "/assets/images/app/panel/devices/devices_windows.png";
          break;
      }
    } else {
      if (item.ios)
        image = "/assets/images/app/panel/devices/devices_iphone.png";
      else if (item.android)
        image = "/assets/images/app/panel/devices/devices_android.png";
      else image = "/assets/images/app/panel/devices/devices_chrome-os.png";
    }

    return (
      <ListItem first={!index} hasBackground dir avatar>
        <Left style={GS.px3}>
          <Thumbnail
            backgroundColor="transparent"
            square={true}
            source={image}
          />
        </Left>
        <Body>
          <Text>{item.platform}</Text>
          <Text note>{item.browser}</Text>
        </Body>
        <Right style={[GS.flexRowDir, GS.alignItemsCenter]}>
          <Button onPress={() => this.silentDevice(item)} transparent>
            <Icon name="ios-notifications-off" type="Ionicons" />
          </Button>
          <Button onPress={() => this.removeDevice(item)} transparent>
            <Icon name="ios-trash" type="Ionicons" />
          </Button>
        </Right>
      </ListItem>
    );
  };
  renderHeader = () => {
    return (
      <View style={[GS.alignItemsCenter, GS.py5]}>
        <Image
          style={Styles.headerImage}
          source={
            this.props.authDataSource.dark
              ? images.backgroundDark
              : images.backgroundLight
          }
        />
      </View>
    );
  };
  handleRefresh = () => {
    this.props.toggleRefresh(true);
    this.props.refresh(true);
  };
  refreshControl = (
    <RefreshControl
      refreshing={this.props.dataSource.refreshing}
      onRefresh={this.handleRefresh}
    />
  );
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("SETTINGS")}
        />
        {this.props.dataSource.settingWaiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            data={this.props.dataSource.setting}
            ListEmptyComponent={this.renderEmpty}
            ListHeaderComponent={this.renderHeader}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            refreshControl={this.refreshControl}
          />
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.notification,
  authDataSource: state.auth
});
const mapDispatchToProps = dispatch => ({
  refresh: skip => NotificationService.fetchSetting(dispatch, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.NotificationSettingRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsSettingsScreen);
