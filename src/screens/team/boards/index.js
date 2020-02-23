import React, { Component } from "react";
import { View, Text, Container } from "native-base";
import Styles from "./styles";
import { connect } from "react-redux";
import BoardItem from "../../../components/board-item";
import EmptyPageComponent from "../../../components/empty-page";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import RefreshControl from "../../../components/elements/refresh-control";
import SimpleHeaderComponent from "../../../components/simple-header";

const Images = {
  noBoards: require("../../../assets/images/no-boards.png")
};
class TeamBoardsScreen extends Component {
  id = "";
  team = null;
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
    this.team = this.props.dataSource.teamedBoards.find(t => t.id === this.id);
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
        {this.team === null ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={GS.flexGrow1}
            data={this.team.boards}
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
export default connect(mapStateToProps, null)(TeamBoardsScreen);
