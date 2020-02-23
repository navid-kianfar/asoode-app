import React, { Component } from "react";
import { View, Content, Icon, Container } from "native-base";
import { ActivityIndicator } from "react-native";
import Styles from "./styles";
import { connect } from "react-redux";
import OrganizationService from "../../../services/organization-service";
import ActionNames from "../../../reducers/action-names";
import SimpleHeaderComponent from "../../../components/simple-header";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import TreeView from "../../../components/elements/tree-view";
import TeamItem from "../../../components/teamItem";

class OrganizationGraphScreen extends Component {
  id = "";
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
    this.props.refresh(this.id, false);
  }
  getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      return "-";
    } else if (isExpanded) {
      return "\\/";
    } else {
      return ">";
    }
  };
  renderNode = ({ node, level, isExpanded, hasChildrenNodes }) => {
    return (
      <View style={GS.flexRowDir}>
        <Icon
          style={!hasChildrenNodes ? { color: "transparent" } : null}
          name={isExpanded ? "minus" : "plus"}
          type="Entypo"
        />
        <View style={GS.flexGrow1}>
          <TeamItem
            isOrgan={level === 0}
            data={node.info}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          title={I18n.t("GRAPH")}
          navigation={this.props.navigation}
        />
        {this.props.dataSource.graphWaiting ||
        !this.props.dataSource.graphData ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Content>
            <TreeView
              data={this.props.dataSource.graphData}
              getCollapsedNodeHeight={() => 150}
              idKey={item => item.info.id}
              initialExpanded={true}
              renderNode={this.renderNode}
            />
          </Content>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.organization
});
const mapDispatchToProps = dispatch => ({
  refresh: (id, skip) => OrganizationService.graph(dispatch, id, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.OrganizationGraphRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationGraphScreen);
