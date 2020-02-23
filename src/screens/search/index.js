import React, { Component } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import {
  Container,
  Content,
  Button,
  Left,
  Body,
  Segment,
  Item,
  Icon,
  Input,
  Text,
  Header,
  View
} from "native-base";
import GS from "../../themes/general-styles";
import I18n from "../../i18n";
import { SearchSections } from "../../library/enums";
import SearchService from "../../services/search-service";
import ActionNames from "../../reducers/action-names";
import { connect } from "react-redux";
import BoardListCard from "../../components/board-list-card";
import BoardItem from "../../components/board-item";
import TeamItem from "../../components/teamItem";
import UserItem from "../../components/user-item";
import _ from "lodash";
import EmptyPageComponent from "../../components/empty-page";

class SearchScreen extends Component {
  renderMemberItem = ({ item }) => {
    return <UserItem navigation={this.props.navigation} data={item} />;
  };
  renderTeamItem = ({ item }) => {
    return <TeamItem navigation={this.props.navigation} data={item} />;
  };
  renderBoardItem = ({ item }) => {
    return <BoardItem navigation={this.props.navigation} data={item} />;
  };
  renderCardItem = ({ item }) => {
    return (
      <BoardListCard navigation={this.props.navigation} data={item.card} />
    );
  };
  renderEmpty = () => {
    return (
      <Content contentContainerStyle={[GS.flexGrow1, GS.py4]}>
        <EmptyPageComponent
          image={require("../../assets/images/no-search-result.png")}
          imageHeightRatio={0.75}
          header={I18n.t("SEARCH_SCREEN__NO_RESULTS")}
        />
      </Content>
    );
  };
  renderContent = () => {
    if (this.props.dataSource.waiting) {
      return (
        <View style={GS.waitingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (!this.props.dataSource.items) {
      return (
        <Content contentContainerStyle={[GS.flexGrow1, GS.py4]}>
          <EmptyPageComponent
            image={require("../../assets/images/search-bg.png")}
            imageHeightRatio={0.7}
            header={I18n.t("SEARCH_SCREEN__SEARCH_FOR")}
            description={I18n.t("SEARCH_SCREEN__SEARCH_FOR_DESCRIPTION")}
          />
        </Content>
      );
    }
    switch (this.props.dataSource.section) {
      case SearchSections.Cards:
        return (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={[GS.flexGrow1, GS.px2, GS.py2]}
            data={this.props.dataSource.items.cardList}
            renderItem={this.renderCardItem}
            ListEmptyComponent={this.renderEmpty}
            keyExtractor={item => item.card.id}
          />
        );
      case SearchSections.Boards:
        return (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={[GS.flexGrow1, GS.px2, GS.py2]}
            data={this.props.dataSource.items.boardList}
            renderItem={this.renderBoardItem}
            ListEmptyComponent={this.renderEmpty}
            keyExtractor={item => item.id}
          />
        );
      case SearchSections.Teams:
        return (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={[GS.flexGrow1, GS.px2, GS.py2]}
            data={this.props.dataSource.items.teamList}
            renderItem={this.renderTeamItem}
            ListEmptyComponent={this.renderEmpty}
            keyExtractor={item => item.id}
          />
        );
      default:
        return (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={[GS.flexGrow1, GS.px2, GS.py2]}
            data={this.props.dataSource.items.memberList}
            renderItem={this.renderMemberItem}
            ListEmptyComponent={this.renderEmpty}
            keyExtractor={item => item.id}
          />
        );
    }
  };
  render() {
    return (
      <Container>
        <Header searchBar hasSegment>
          <Left>
            <Button
              style={GS.headerIcon}
              onPress={() => this.props.navigation.goBack(null)}
              dark
              transparent
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Item noBorder dir>
              <Icon name="search" />
              <Input
                placeholder={I18n.t("SEARCH")}
                onChangeText={val =>
                  this.props.filter(val, false, this.debounceSearch)
                }
                value={this.props.dataSource.filter}
                clearButtonMode="while-editing"
                // clearButtonMode="unless-editing"
              />
            </Item>
          </Body>
        </Header>
        <Segment>
          <Button
            first
            active={this.props.dataSource.section === SearchSections.Cards}
            onPress={() => this.props.switchSection(SearchSections.Cards)}
          >
            <Text>{I18n.t("CARDS")}</Text>
          </Button>
          <Button
            active={this.props.dataSource.section === SearchSections.Boards}
            onPress={() => this.props.switchSection(SearchSections.Boards)}
          >
            <Text>{I18n.t("BOARDS")}</Text>
          </Button>
          <Button
            active={this.props.dataSource.section === SearchSections.Teams}
            onPress={() => this.props.switchSection(SearchSections.Teams)}
          >
            <Text>{I18n.t("TEAMS")}</Text>
          </Button>
          <Button
            last
            active={this.props.dataSource.section === SearchSections.Members}
            onPress={() => this.props.switchSection(SearchSections.Members)}
          >
            <Text>{I18n.t("MEMBERS")}</Text>
          </Button>
        </Segment>
        {/*{this.renderContent()}*/}
        <this.renderContent />
      </Container>
    );
  }
  debounceSearch = _.debounce((dispatch, filter, skip) => {
    SearchService.filter(dispatch, filter, skip);
  }, 800);
}
const mapStateToProps = state => ({
  dataSource: state.search
});
const mapDispatchToProps = dispatch => ({
  filter: (query, skip, debounce) => {
    query = (query || "").trim();
    dispatch({ type: ActionNames.SearchChangeFilter, payload: query });
    if (!query) {
      dispatch({
        type: ActionNames.SearchFetchSuccess,
        payload: {
          cardList: [],
          boardList: [],
          teamList: [],
          memberList: []
        }
      });
      return;
    }
    debounce(dispatch, query, skip);
  },
  switchSection: section => {
    dispatch({
      type: ActionNames.SearchSwitchSection,
      payload: section
    });
  },
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.SearchRefresh,
      payload: status
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
