import React, { Component } from "react";
import {
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  LayoutAnimation
} from "react-native";
import {
  View,
  Text,
  Container,
  Button,
  Item,
  Drawer,
  Input
} from "native-base";
import PropTypes from "prop-types";
import Styles from "./styles";
import BoardList from "../../components/board-list";
import I18n from "../../i18n";
import ActionNames from "../../reducers/action-names";
import BoardService from "../../services/board-service";
import { connect } from "react-redux";
import GS from "../../themes/general-styles";
import { BoardDetailDTO } from "../../dtos/board.dtos";
import Constants from "../../library/constants";
import BoardHeader from "./header";
import { BoardPermission } from "../../library/enums";
import { getInputHeight } from "../../library/general-helpers";
import BoardSidebar from "./sidebar";
import { Metrics } from "../../themes/variables";
import Platform from "../../../native-base-theme/variables/platform-light";
import ListActionsModal from "../../components/modals/list-actions-modal";
import BackgroundWrapper from "../../components/elements/background-wrapper";

class BoardScreen extends Component {
  // static propTypes = {
  //   dataSource: PropTypes.shape(BoardDetailDTO)
  // };
  state = {
    openedItems: {
      newCard: undefined,
      addList: undefined
    },
    listActionList: undefined
  };
  id = "";
  title = "";
  boardColor = "";
  boardPicture = "";
  componentDidMount() {
    this.id = this.props.navigation.getParam("id");
    this.title = this.props.navigation.getParam("title");
    this.boardColor = this.props.navigation.getParam("boardColor");
    this.boardPicture = this.props.navigation.getParam("boardPicture");
    this.archived = this.props.navigation.getParam("archived") || false;
    this.props.refresh(this.id, this.archived, false);
  }
  openActions = list => {
    this.setState({ listActionList: list });
    this.refs.listActions.open();
  };
  openChange = (field, index) => {
    const openedItems = {
      newCard: undefined,
      addList: undefined
    };
    if (field) {
      if (openedItems[field] === index) {
        return;
      }
      openedItems[field] = index;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ openedItems });
  };
  openAddCard = () => {
    const index = this.props.dataSource.detail.lists.findIndex(
      list => list.id === this.state.listActionList.id
    );
    this.openChange("newCard", index);
  };
  renderItem = ({ item, index }) => (
    <BoardList
      data={item}
      index={index}
      setting={this.props.dataSource.detail.setting}
      customFields={this.props.dataSource.detail.customFields}
      openedItems={this.state.openedItems}
      openChange={this.openChange}
      navigation={this.props.navigation}
      openActions={() => this.openActions(item)}
    />
  );
  renderAddList = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.openChange()}
        style={Styles.listContainer}
      >
        {this.state.openedItems.addList ? (
          <TouchableOpacity activeOpacity={1}>
            <View style={[GS.px2, GS.py2]} boardList>
              <Item style={GS.my2} card>
                <Input
                  textAlignVertical="top"
                  multiline
                  style={getInputHeight(3)}
                  numberOfLines={3}
                />
              </Item>
              <View style={[GS.flexRowDir, GS.justifyContentEnd]}>
                <Button onPress={() => this.openChange()} style={GS.mx2} light>
                  <Text>{I18n.t("CANCEL")}</Text>
                </Button>
                <Button>
                  <Text>{I18n.t("SAVE")}</Text>
                </Button>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <Button
            onPress={() => this.openChange("addList", true)}
            block
            addList
          >
            <Text>{I18n.t("ADD_LIST")}</Text>
          </Button>
        )}
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Container>
        <Drawer
          ref="drawer"
          content={
            <BoardSidebar
              ref="sidebar"
              board={this.props.dataSource.detail}
              waiting={this.props.dataSource.detailWaiting}
              onClose={() => this.refs.drawer._root.close()}
              navigation={this.props.navigation}
            />
          }
          onClose={() => this.refs.sidebar.wrappedInstance.onClose(true)}
          captureGestures="open"
          side={I18n.isRtl ? "right" : "left"}
          openDrawerOffset={80}
        >
          <BoardHeader
            id={this.id}
            title={this.title}
            openChange={this.openChange}
            isAdmin={
              this.props.dataSource?.detail.permission === BoardPermission.Admin
            }
            navigation={this.props.navigation}
            drawer={this.refs.drawer}
          />
          <BackgroundWrapper
            style={Styles.wrapperElement}
            picture={this.boardPicture}
            color={this.boardColor}
            dark={this.props.dataSource?.detail.dark}
          >
            <SafeAreaView style={GS.flex1}>
              {!this.props.dataSource.detail.id ? (
                <View style={GS.waitingContainer}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <FlatList
                  contentContainerStyle={[
                    GS.flexGrow1,
                    Platform.isIphoneX ? GS.pt3 : GS.py3
                  ]}
                  data={this.props.dataSource.detail.lists}
                  ListFooterComponent={this.renderAddList}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                  horizontal
                  windowSize={2}
                  initialNumToRender={8}
                  maxToRenderPerBatch={1}
                  inverted={I18n.isRtl}
                />
              )}
            </SafeAreaView>
          </BackgroundWrapper>
        </Drawer>
        <ListActionsModal
          ref="listActions"
          data={this.state.listActionList}
          addCard={this.openAddCard}
          board={this.props.dataSource.detail}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.board
});

const mapDispatchToProps = dispatch => ({
  refresh: (id, archived, skip) =>
    BoardService.fetchDetail(dispatch, id, archived, skip),
  toggleRefresh: status =>
    dispatch({
      type: ActionNames.BoardDetailRefresh,
      payload: status
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(BoardScreen);
