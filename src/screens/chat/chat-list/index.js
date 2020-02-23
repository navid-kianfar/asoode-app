import React, { Component } from "react";
import Moment from "react-moment";
import "moment/locale/fa";
import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import RefreshControl from "../../../components/elements/refresh-control";
import I18n from "../../../i18n";
import {
  View,
  Text,
  ListItem,
  Left,
  Body,
  Right,
  Item,
  Icon,
  Input,
  Container,
  Button
} from "native-base";
import GS from "../../../themes/general-styles";
import Thumbnail from "../../../components/elements/thumbnail";
import ActionNames from "../../../reducers/action-names";
import ChatService from "../../../services/chat-service";
import { connect } from "react-redux";
import EmptyPageComponent from "../../../components/empty-page";
import MainHeaderComponent from "../../../components/main-header";
import { ChatType } from "../../../library/enums";

const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
class ChatList extends Component {
  componentDidMount() {
    this.props.refresh(false);
  }

  goToChat = item => {
    this.props.clear();
    this.props.navigation.navigate("ChatField", item);
  };
  getLastMessage = item => {
    switch (item.type) {
      case ChatType.Text:
        return item.message;
      case ChatType.File:
        return I18n.t("CHAT_FILE_SHARED");
      case ChatType.Card:
        return I18n.t("CHAT_CARD_ATTACHED");
      case ChatType.Board:
        return I18n.t("CHAT_BOARD_ATTACHED");
    }
  };
  renderItem = ({ item }) => {
    return (
      <ListItem onPress={() => this.goToChat(item)} avatar dir>
        <Left>
          <Thumbnail small source={item.avatar} title={item.title} />
        </Left>
        <Body style={GS.me2}>
          <View style={[GS.flexRowDir]}>
            <View style={[GS.flexGrow1, GS.flexShrink1]}>
              <Text numberOfLines={1} style={GS.textEllipsis}>
                {item.title}
              </Text>
            </View>
            <View style={GS.ps3}>
              <Moment locale="fa" element={MomentText} local fromNow>
                {item.createdAt}
              </Moment>
            </View>
          </View>
          <Text numberOfLines={1} note>
            {this.getLastMessage(item)}
          </Text>
        </Body>
      </ListItem>
    );
  };
  renderEmpty = () => {
    return (
      <EmptyPageComponent
        image={require("../../../assets/images/no-messages.png")}
        imageHeightRatio={0.8}
        header={I18n.t("NO_MESSAGES")}
        description={I18n.t("NO_MESSAGES_DESCRIPTION")}
        buttonText={I18n.t("START_CHAT")}
        handler={this.props.navigation.toggleDrawer}
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
    const data = [
      ...this.props.dataSource.boards,
      ...this.props.dataSource.teams,
      ...this.props.dataSource.organs
    ].filter(i => i.type);
    data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return (
      <Container>
        <MainHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("CHAT")}
          chatHeader
        />
        {this.props.dataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            data={data}
            contentContainerStyle={[GS.flexGrow1]}
            renderItem={this.renderItem}
            keyExtractor={(_, i) => `${i}`}
            // ListHeaderComponent={this.listHeader}
            refreshControl={this.refreshControl}
            ListEmptyComponent={this.renderEmpty}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.chat
});

const mapDispatchToProps = dispatch => ({
  refresh: skip => ChatService.fetch(dispatch, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.ChatRefresh,
      payload: status
    });
  },
  clear: () => dispatch({ type: ActionNames.ChatDetailClear })
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
