import React, { Component } from "react";
import { View, Text, Container, Button, Icon } from "native-base";
import Styles from "./styles";
import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import RefreshControl from "../../components/elements/refresh-control";
import MainHeaderComponent from "../../components/main-header";
import I18n from "../../i18n";
import GS from "../../themes/general-styles";
import CalendarCard from "../../components/calendar-card";
import ActionNames from "../../reducers/action-names";
import CalendarService from "../../services/calendar-service";
import { connect } from "react-redux";
import CulturedDate from "../../library/cultured-date";
import DatePickerModal from "../../components/elements/date-picker-modal";
import EmptyPageComponent from "../../components/empty-page";
import CalendarAddCardModal from "./add-modal";

class CalendarScreen extends Component {
  state = {
    addCardModalOpen: false
  };
  componentDidMount() {
    this.props.refresh(false);
  }

  next = () => {
    const date = new Date(this.props.dataSource.date.getTime());
    date.setDate(date.getDate() + 1);
    this.props.updateDate(date);
  };
  prev = () => {
    const date = new Date(this.props.dataSource.date.getTime());
    date.setDate(date.getDate() - 1);
    this.props.updateDate(date);
  };
  renderTasks = ({ item }) => {
    return <CalendarCard navigation={this.props.navigation} data={item} />;
  };
  onDateChange = date => {
    setTimeout(() => {
      this.props.updateDate(date);
    }, 0);
  };
  renderHeader = date => (
    <View style={[GS.flexRowDir, GS.mt3, Styles.calendarHeader]}>
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
  renderEmpty = () => {
    return (
      <EmptyPageComponent
        image={require("../../assets/images/no-calendar-tasks.png")}
        imageHeightRatio={0.677}
        header={I18n.t("NO_CALENDAR_TASKS")}
        description={I18n.t("NO_CALENDAR_TASKS_DESCRIPTION")}
        buttonText={I18n.t("ADD_CALENDAR_TASKS")}
        handler={() => this.props.navigation.navigate("CalendarAddCardModal")}
      />
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
    const date = CulturedDate.parse(this.props.dataSource.date);
    return (
      <Container>
        <MainHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("CALENDAR")}
        />
        {this.props.dataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={GS.flexGrow1}
            data={this.props.dataSource.filtered}
            renderItem={this.renderTasks}
            ListHeaderComponent={() => this.renderHeader(date)}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={this.renderEmpty}
            refreshControl={this.refreshControl}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.calendar
});

const mapDispatchToProps = dispatch => ({
  refresh: skip => CalendarService.fetch(dispatch, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.CalendarRefresh,
      payload: status
    });
  },
  updateDate: date => {
    dispatch({
      type: ActionNames.CalendarUpdate,
      payload: date
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
