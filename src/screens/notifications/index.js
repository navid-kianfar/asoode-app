import React, { Component } from "react";
import {
  Container,
  Header,
  Icon,
  Text,
  Left,
  Button,
  Segment,
  Body,
  Right,
  Content,
  View
} from "native-base";
import I18n from "../../i18n";
import { ActivityIndicator, FlatList, Image } from "react-native";
import RefreshControl from "../../components/elements/refresh-control";
import { connect } from "react-redux";
import NotificationService from "../../services/notification-service";
import ActionNames from "../../reducers/action-names";
import GS from "../../themes/general-styles";
import ActivityItem from "../../components/activity-item";
import NotificationItem from "../../components/notification-item";
import LazyLoadFlatList from "../../components/elements/lazy-load";

class NotificationsScreen extends Component {
  state = {
    isActivity: false
  };
  handleRefreshActivities = () => {
    this.props.toggleActivitiesRefresh(true);
    this.props.refreshActivities(true);
  };
  handleRefreshNotifications = () => {
    this.props.toggleNotificationsRefresh(true);
    this.props.refreshNotifications(true);
  };
  componentWillMount() {
    this.switchView(false);
  }

  switchView(status) {
    this.setState({ isActivity: status });
  }
  goBack = () => {
    this.props.navigation.goBack(null);
  };
  goToSettings = () => {
    this.props.navigation.navigate("NotificationsSettingsScreen");
  };

  renderActivities = ({ item }) => {
    return <ActivityItem data={item} />;
  };
  renderNotifications = ({ item }) => {
    return <NotificationItem data={item} />;
  };
  renderFooter = () => {
    return (
      <View style={GS.py3}>
        <Button transparent block>
          <Icon name="reload1" type="AntDesign" />
          <Text style={{ fontSize: 20 }}>{I18n.t("LOAD_MORE")}</Text>
        </Button>
      </View>
    );
  };
  keyExtractor = item => item.id;

  refreshControl = (
    <RefreshControl
      refreshing={this.props.dataSource.refreshing}
      onRefresh={this.handleRefreshActivities}
    />
  );
  render() {
    return (
      <Container>
        <Header hasSegment>
          <Left>
            <Button
              style={GS.headerIcon}
              onPress={this.goBack}
              dark
              transparent
            >
              <Icon style={GS.headerIcon} name="chevron-left" type="Feather" />
            </Button>
          </Left>
          <Body>
            <Segment>
              <Button
                onPress={() => this.switchView(false)}
                active={!this.state.isActivity}
                first
              >
                <Text>{I18n.t("NOTIFICATIONS")}</Text>
              </Button>
              <Button
                onPress={() => this.switchView(true)}
                active={this.state.isActivity}
                last
              >
                <Text>{I18n.t("ALL_ACTIVITIES")}</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
            <Button
              style={GS.headerIcon}
              onPress={this.goToSettings}
              dark
              transparent
            >
              <Icon style={GS.headerIcon} name="settings" type="Feather" />
            </Button>
          </Right>
        </Header>
        {this.state.isActivity ? (
          this.props.dataSource.activitiesWaiting ? (
            <View style={GS.waitingContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <LazyLoadFlatList
              backend="/push-notification/reminders"
              flatListProps={{
                style: GS.zIndexM,
                contentContainerStyle: [GS.flexGrow1, GS.px2, GS.py2],
                ListEmptyComponent: this.renderEmpty,
                refreshing: this.props.dataSource.refreshing,
                onRefresh: this.handleRefreshActivities,
                renderItem: this.renderActivities,
                keyExtractor: this.keyExtractor
              }}
            />
          )
        ) : this.props.dataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <LazyLoadFlatList
            backend="/user/activities/alerts"
            flatListProps={{
              contentContainerStyle: [GS.flexGrow1, GS.px2, GS.py2],
              ListEmptyComponent: this.renderEmpty,
              refreshing: this.props.dataSource.refreshing,
              onRefresh: this.handleRefreshNotifications,
              renderItem: this.renderNotifications,
              keyExtractor: this.keyExtractor
            }}
          />
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.notification
});
const mapDispatchToProps = dispatch => ({
  refreshNotifications: skip =>
    NotificationService.notifications(dispatch, skip),
  refreshActivities: skip => NotificationService.activities(dispatch, skip),
  toggleNotificationsRefresh: status => {
    dispatch({
      type: ActionNames.NotificationRefresh,
      payload: status
    });
  },
  toggleActivitiesRefresh: status => {
    dispatch({
      type: ActionNames.NotificationActivitiesRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
