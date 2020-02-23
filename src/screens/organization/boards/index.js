import React, { Component } from "react";
import { View, Text, Container } from "native-base";
import Styles from "./styles";
import OrganizationService from "../../../services/organization-service";
import ActionNames from "../../../reducers/action-names";
import { connect } from "react-redux";
import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import RefreshControl from "../../../components/elements/refresh-control";
import BoardItem from "../../../components/board-item";
import EmptyPageComponent from "../../../components/empty-page";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import SimpleHeaderComponent from "../../../components/simple-header";

const Images = {
  noBoards: require("../../../assets/images/no-boards.png")
};
class OrganizationBoardsScreen extends Component {
  id = "";
  componentWillMount() {
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
          title={I18n.t("BOARDS")}
          navigation={this.props.navigation}
        />
        {this.props.dataSource.boardsWaiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={GS.flexGrow1}
            data={this.props.dataSource.boards}
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
  dataSource: state.organization
});
const mapDispatchToProps = dispatch => ({
  refresh: (id, skip) => OrganizationService.boards(dispatch, id, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.OrganizationBoardsRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationBoardsScreen);
