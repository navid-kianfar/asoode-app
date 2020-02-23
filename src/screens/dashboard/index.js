import React, { Component } from "react";
import { StatusBar, FlatList, Image, ActivityIndicator } from "react-native";
import RefreshControl from "../../components/elements/refresh-control";
import I18n from "../../i18n";
import { Container, Button, Card, CardItem, View, Text, H1 } from "native-base";
import { connect } from "react-redux";
import GS from "../../themes/general-styles";
import ReportService from "../../services/report-service";
import ActionNames from "../../reducers/action-names";
import { LineChart } from "react-native-chart-kit";
import { Metrics } from "../../themes/variables";
import Styles from "./styles";
import BoardItem from "../../components/board-item";
import MainHeaderComponent from "../../components/main-header";
import EmptyPageComponent from "../../components/empty-page";
import Alert from "../../components/elements/alert";

const Images = {
  noBoards: require("../../assets/images/no-boards.png")
};
class DashboardScreen extends Component {
  componentDidMount() {
    this.props.refresh(false);
  }

  chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(77, 124, 254, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0, // optional, defaults to 2dp
    style: {
      borderRadius: 16
    }
  };
  renderBoards = ({ item }) => {
    return <BoardItem navigation={this.props.navigation} data={item} />;
  };
  renderHeader = () => {
    if ((this.props.dataSource.data.boardReports || []).length) {
      return (
        <>
          {/*<Button onPress={() => console.log(Alert)}>*/}
          {/*  <Text>click!</Text>*/}
          {/*</Button>*/}
          <Card margined>
            <CardItem padder>
              <View style={Styles.chartSection}>
                <View style={[Styles.chartInfo]}>
                  <View>
                    <Text>
                      <H1>{this.props.dataSource.data.totalDone}</H1>/
                      {this.props.dataSource.data.totalTasks}
                      <Text> {I18n.t("TASKS_DONE")}</Text>
                    </Text>
                  </View>
                </View>
                <View style={Styles.chartWrapper}>
                  <LineChart
                    data={this.props.dataSource.chart}
                    width={Metrics.WIDTH - Metrics.rem * 1.4}
                    height={120}
                    chartConfig={this.chartConfig}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
                </View>
              </View>
            </CardItem>
          </Card>
          <View style={GS.mt3}>
            <Text mute style={Styles.sectionHeaderText}>
              {I18n.t("BOARDS")}
            </Text>
          </View>
        </>
      );
    }
    return null;
  };
  renderEmpty = () => {
    return (
      <EmptyPageComponent
        image={Images.noBoards}
        imageHeightRatio={0.71875}
        header={I18n.t("NO_BOARDS")}
        description={I18n.t("NO_BOARDS_DESCRIPTION")}
        buttonText={I18n.t("NEW_BOARD")}
        handler={() => alert("add")}
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
    return (
      <Container>
        <MainHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("DASHBOARD")}
        />
        {this.props.dataSource.waiting || !this.props.dataSource.loaded ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={GS.flexGrow1}
            data={this.props.dataSource.data.boardReports}
            ListHeaderComponent={this.renderHeader}
            ListEmptyComponent={this.renderEmpty}
            renderItem={this.renderBoards}
            keyExtractor={(_, i) => `${i}`}
            refreshControl={this.refreshControl}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.dashboard
});

const mapDispatchToProps = dispatch => ({
  refresh: skip => ReportService.dashboard(dispatch, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.DashboardRefresh,
      payload: status
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
