import React, { Component } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import RefreshControl from "../../../components/elements/refresh-control";
import { View, Container } from "native-base";
import { connect } from "react-redux";
import BoardService from "../../../services/board-service";
import ActionNames from "../../../reducers/action-names";
import BoardItem from "../../../components/board-item";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import EmptyPageComponent from "../../../components/empty-page";
import SimpleHeaderComponent from "../../../components/simple-header";

const Images = {
  noBoards: require("../../../assets/images/no-boards.png")
};
class PersonalArchivedBoardsScreen extends Component {
  componentDidMount() {
    this.props.refresh(false);
  }

  renderBoards = ({ item }) => {
    return (
      <BoardItem
        archived={true}
        navigation={this.props.navigation}
        data={item}
      />
    );
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
      refreshing={this.props.dataSource.archivedRefreshing}
      onRefresh={this.handleRefresh}
    />
  );
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("ARCHIVED_BOARDS")}
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
  dataSource: state.board
});
const mapDispatchToProps = dispatch => ({
  refresh: skip => BoardService.archived(dispatch, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.BoardArchivedRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalArchivedBoardsScreen);
