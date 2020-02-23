import React, { Component } from "react";
import {
  Container,
  ListItem,
  Text,
  Button,
  View,
  Icon,
  Left,
  Body
} from "native-base";
import Styles from "./styles";
import SimpleHeaderComponent from "../../../components/simple-header";
import GS from "../../../themes/general-styles";
import { ActivityIndicator, SectionList, Platform } from "react-native";
import CulturedDate from "../../../library/cultured-date";
import DatePickerModal from "../../../components/elements/date-picker-modal";
import I18n from "../../../i18n";
import EmptyPageComponent from "../../../components/empty-page";
import RefreshControl from "../../../components/elements/refresh-control";
import TimeSpentMemberItem from "./renderItem";
import TeamItem from "../../../components/teamItem";
import Thumbnail from "../../../components/elements/thumbnail";
import TimeSpentService from "../../../services/timespent-service";
import ActionNames from "../../../reducers/action-names";
import { connect } from "react-redux";
import { PLATFORM } from "../../../../native-base-theme/variables/commonColor";
import Alert from "../../../services/alert-service";

class TimeSpentScreen extends Component {
  id = "";
  title = "";
  componentDidMount() {
    this.id = this.props.navigation.getParam("id");
    this.title = this.props.navigation.getParam("title");
    this.props.refresh(
      { id: this.id, date: this.props.dataSource.date },
      false
    );
  }
  next = () => {
    const date = new Date(this.props.dataSource.date.getTime());
    date.setDate(date.getDate() + 1);
    this.props.updateDate(this.id, date);
  };
  prev = () => {
    const date = new Date(this.props.dataSource.date.getTime());
    date.setDate(date.getDate() - 1);
    this.props.updateDate(this.id, date);
  };
  onDateChange = date => {
    setTimeout(() => {
      this.props.updateDate(this.id, date);
    }, 0);
  };
  toggleWorking = () => {
    if (
      this.props.dataSource.waitingDetail ||
      this.props.dataSource.waitingToggle
    )
      return;
    const canStart =
      this.props.profile.underWayTeamId === this.id ||
      this.props.dataSource.canStartWorking;

    if (!canStart) {
      Alert.info("ALREADY_WORKING_IN_ANOTHER_TEAM");
      return;
    }
    const title = this.props.dataSource.canStartWorking
      ? "START_OF_WORK_TIME"
      : "END_OF_WORK_TIME";
    Alert.confirm(undefined, title, [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t(title),
        style: "destructive",
        onPress: async () => {
          return await TimeSpentService.toggleWorking(
            this.props.dispatch,
            this.id
          );
        }
      }
    ]);
  };
  renderHeader = date => (
    <View style={[GS.flexRowDir, GS.my3, Styles.calendarHeader]}>
      <DatePickerModal
        time
        update={this.onDateChange}
        model={this.props.dataSource.date}
      >
        <View style={[GS.flexRowDir, Styles.sectionHeaderTextWrapper]}>
          <Icon
            style={[GS.me1, Styles.sectionHeaderIcon]}
            name="calendar"
            type="Feather"
          />
          <Text style={Styles.sectionHeaderText}>
            <Text style={Styles.sectionHeaderTextBold}>
              {date.weekday} {date.day}
            </Text>{" "}
            {date.monthName}
          </Text>
        </View>
      </DatePickerModal>
      <View style={GS.flexRowDir}>
        <Button onPress={I18n.isRtl ? this.prev : this.next} square white small>
          <Icon
            name={"chevron-" + (I18n.isRtl ? "right" : "left")}
            type="Feather"
          />
        </Button>
        <Button
          onPress={I18n.isRtl ? this.next : this.prev}
          style={GS.ms1}
          small
          white
          square
        >
          <Icon
            name={"chevron-" + (I18n.isRtl ? "left" : "right")}
            type="Feather"
          />
        </Button>
      </View>
    </View>
  );
  renderItem = ({ item }) => {
    return (
      <TimeSpentMemberItem navigation={this.props.navigation} data={item} />
    );
  };
  renderSectionHeader = ({ section }) => {
    return (
      <ListItem hasBackground avatar dir>
        <Left>
          <Thumbnail
            extraSmall={Platform.OS === PLATFORM.IOS}
            small={Platform.OS === PLATFORM.ANDROID}
            source={section.member.avatar}
            title={section.member.initials}
          />
        </Left>
        <Body>
          <Text>{section.member.fullName}</Text>
        </Body>
      </ListItem>
    );
  };
  renderEmpty = () => {
    return (
      <EmptyPageComponent
        image={require("../../../assets/images/no-calendar-tasks.png")}
        imageHeightRatio={0.677}
        header={I18n.t("NO_TIME_SPENT")}
        // description={I18n.t("NO_TIME_SPENT_DESCRIPTION")}
      />
    );
  };
  handleRefresh = () => {
    this.props.toggleRefresh(true);
    this.props.refresh({ id: this.id, date: this.props.dataSource.date }, true);
  };
  refreshControl = (
    <RefreshControl
      refreshing={this.props.dataSource.refreshing}
      onRefresh={this.handleRefresh}
    />
  );
  render() {
    const date = CulturedDate.parse(this.props.dataSource.date);
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={this.title}
          rightInnerComponent={
            <Button onPress={this.toggleWorking} dark transparent>
              <Icon
                style={GS.headerIcon}
                name={
                  this.props.dataSource.canStartWorking
                    ? "playcircleo"
                    : "pausecircleo"
                }
                type="AntDesign"
              />
            </Button>
          }
        />
        {this.props.dataSource?.waiting || !this.props.dataSource.loaded ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <SectionList
            // style={GS.zIndexM}
            contentContainerStyle={GS.flexGrow1}
            sections={this.props.dataSource.detail.rows}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            ListHeaderComponent={() => this.renderHeader(date)}
            keyExtractor={item => `${item.beginTime}`}
            ListEmptyComponent={this.renderEmpty}
            stickySectionHeadersEnabled
            refreshControl={this.refreshControl}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.timeSpent,
  profile: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  refresh: (model, skip) => TimeSpentService.fetch(dispatch, model, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.TimeSpentDetailRefresh,
      payload: status
    });
  },
  updateDate: (id, date) => {
    dispatch({
      type: ActionNames.TimeSpentDetailUpdate,
      payload: date
    });
    TimeSpentService.fetch(dispatch, { id, date }, false);
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TimeSpentScreen);
