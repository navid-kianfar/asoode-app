import React, { Component } from "react";
import { View, Text, Container, H1, Card, CardItem } from "native-base";
import Styles from "../../dashboard/styles";
import OrganizationService from "../../../services/organization-service";
import ActionNames from "../../../reducers/action-names";
import { connect } from "react-redux";
import { ActivityIndicator, FlatList } from "react-native";
import RefreshControl from "../../../components/elements/refresh-control";
import GS from "../../../themes/general-styles";
import SimpleHeaderComponent from "../../../components/simple-header";
import I18n from "../../../i18n";
import { LineChart } from "react-native-chart-kit";
import { Metrics } from "../../../themes/variables";

class OrganizationReportsScreen extends Component {
  id = "";
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
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
    this.props.refresh(this.id, false);
  }
  handleRefresh = () => {
    this.props.toggleRefresh(true);
    this.props.refresh(this.id, true);
  };
  renderCharts = ({ item }) => {
    return (
      <Card margined>
        <CardItem padder>
          <View style={Styles.chartSection}>
            <View style={[Styles.chartInfo]}>
              <View>
                <Text>
                  <H1>{item.filtered}</H1>/{item.total}
                  <Text> {I18n.t(item.label)}</Text>
                </Text>
              </View>
            </View>
            <View style={Styles.chartWrapper}>
              <LineChart
                data={item.chart}
                width={Metrics.WIDTH - Metrics.rem * 1.4}
                height={120}
                chartConfig={this.chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  marginHorizontal: 0,
                  borderRadius: 16
                }}
              />
            </View>
          </View>
        </CardItem>
      </Card>
    );
  };

  refreshControl = (
    <RefreshControl
      refreshing={this.props.dataSource.reportsRefreshing}
      onRefresh={this.handleRefresh}
    />
  );
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          title={I18n.t("REPORTS")}
          navigation={this.props.navigation}
        />
        {this.props.dataSource.reportsWaiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={GS.flexGrow1}
            data={this.props.dataSource.chartData}
            renderItem={this.renderCharts}
            keyExtractor={(_, i) => `${i}`}
            refreshControl={this.refreshControl}
          />
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.organization
});
const mapDispatchToProps = dispatch => ({
  refresh: (id, skip) => OrganizationService.reports(dispatch, id, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.OrganizationReportsRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationReportsScreen);
