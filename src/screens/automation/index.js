import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { View, Text, Container } from "native-base";
import Styles from "./styles";
import AutomationService from "../../services/automation-service";
import ActionNames from "../../reducers/action-names";
import { connect } from "react-redux";
import GS from "../../themes/general-styles";
import SimpleHeaderComponent from "../../components/simple-header";
import I18n from "../../i18n";
import Svg from "../../components/elements/svg";
import MainHeaderComponent from "../../components/main-header";

class AutomationScreen extends Component {
  componentDidMount() {
    // this.props.refresh(false);
  }
  render() {
    return (
      <Container>
        <MainHeaderComponent
          title={I18n.t("AUTOMATION")}
          navigation={this.props.navigation}
        />
        {this.props.dataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={[GS.flex1, GS.justifyContentCenter, GS.alignItemsCenter]}
          >
            <Svg name="automation" size={70} />
            <Text style={GS.mt4}>{I18n.t("COMING_SOON")}</Text>
          </View>
        )}
      </Container>
    );
    if (this.props.dataSource.waiting) {
      return <ActivityIndicator />;
    }
    return (
      <View>
        <Text>Data loaded!!!</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.automation
});

const mapDispatchToProps = dispatch => ({
  refresh: skip => AutomationService.fetch(dispatch, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.AutomationRefresh,
      payload: status
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AutomationScreen);
