import React, { Component } from "react";
import { connectStyle, Container, Text, View } from "native-base";
import { connect } from "react-redux";
import GS from "../../themes/general-styles";
import OrganizationService from "../../services/organization-service";
import TeamService from "../../services/team-service";
import ActionNames from "../../reducers/action-names";
import Styles from "./styles";
import TeamItem from "../../components/teamItem";
import { ActivityIndicator, FlatList, SectionList } from "react-native";
import RefreshControl from "../../components/elements/refresh-control";
import I18n from "../../i18n";
import MainHeaderComponent from "../../components/main-header";

export class TeamsScreen extends Component {
  componentDidMount() {
    this.props.refresh(false);
  }
  renderHeader = ({ section }) => {
    if (!(section.data || []).length) {
      return null;
    }
    return (
      <View bg2>
        <Text mute style={[GS.my2, Styles.sectionHeaderText]}>
          {section.title}
        </Text>
      </View>
    );
  };
  renderItem = ({ item, section }) => {
    return (
      <TeamItem
        isOrgan={section.isOrgan}
        data={item}
        navigation={this.props.navigation}
      />
    );
  };

  handleRefresh = () => {
    this.props.toggleRefresh(true);
    this.props.refresh(true);
  };
  refreshControl = (
    <RefreshControl
      refreshing={
        this.props.teamsDataSource.refreshing ||
        this.props.organizationsDataSource.refreshing
      }
      onRefresh={this.handleRefresh}
    />
  );
  render() {
    const sections = [
      {
        title: I18n.t("TEAMS"),
        data: this.props.teamsDataSource.teams
      },
      {
        title: I18n.t("ORGANIZATIONS"),
        isOrgan: true,
        data: this.props.organizationsDataSource.organizations
      }
    ];
    return (
      <Container>
        <MainHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("TEAMS")}
        />
        {this.props.teamsDataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <SectionList
            sections={sections}
            renderSectionHeader={this.renderHeader}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            refreshControl={this.refreshControl}
            stickySectionHeadersEnabled
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  teamsDataSource: state.team,
  organizationsDataSource: state.organization
});

const mapDispatchToProps = dispatch => ({
  refresh: skip => {
    OrganizationService.fetch(dispatch, skip);
    TeamService.fetch(dispatch, skip);
  },
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.TeamRefresh,
      payload: status
    });
    dispatch({
      type: ActionNames.OrganizationRefresh,
      payload: status
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsScreen);
