import React, { Component } from "react";
import { View, Text, Container } from "native-base";
import Styles from "./styles";
import BoardItem from "../../../components/board-item";
import EmptyPageComponent from "../../../components/empty-page";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import RefreshControl from "../../../components/elements/refresh-control";
import TeamService from "../../../services/team-service";
import ActionNames from "../../../reducers/action-names";
import { connect } from "react-redux";
import SimpleHeaderComponent from "../../../components/simple-header";

const Images = {
  noBoards: require("../../../assets/images/no-boards.png")
};
class TeamArchivedBoardsScreen extends Component {
  id = "";
  componentDidMount() {
    this.id = this.props.navigation.getParam("id");
    this.props.refresh(this.id, false);
  }

  renderBoards = ({ item }) => {
    return <BoardItem navigation={this.props.navigation} data={item} />;
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
          title={I18n.t("ARCHIVED_BOARDS")}
          navigation={this.props.navigation}
        />
        {this.props.dataSource.archivedWaiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={GS.flexGrow1}
            data={this.props.dataSource.archived}
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
  dataSource: state.team
});
const mapDispatchToProps = dispatch => ({
  refresh: (id, skip) => TeamService.archivedBoards(dispatch, id, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.TeamBoardArchivedRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamArchivedBoardsScreen);
