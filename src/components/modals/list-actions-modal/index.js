import React, { Component } from "react";
import Modal from "react-native-modal";
import ModalStyles from "../attachment-modal/styles";
import {
  View,
  Text,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Icon,
  Button
} from "native-base";
import PropTypes from "prop-types";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import Styles from "./styles";
import { LayoutAnimation, ScrollView, TouchableOpacity } from "react-native";
import { BoardDetailDTO, BoardListDTO } from "../../../dtos/board.dtos";
import { BoardPermission, OperationResultStatus } from "../../../library/enums";
import { Metrics } from "../../../themes/variables";
import FormComponent from "../../elements/form";
import HttpService from "../../../services/http-service";
// TODO: connect this colors to general colors
const colors = [
  {
    id: "c703ba17-3fb9-4e5e-9272-a7fedf89ddfc",
    title: "خاکستری",
    latinTitle: "gray",
    value: "#344563"
  },
  {
    id: "52c2b179-f234-457d-a2a2-cd62def53901",
    title: "صورتی",
    latinTitle: "pink",
    value: "#ff78cb"
  },
  {
    id: "32e0d684-9862-4325-9d61-8718368bc540",
    title: "آکوامارین",
    latinTitle: "aquamarine",
    value: "#51e898"
  },
  {
    id: "ecc1fec9-fa1b-4cc5-99a5-80de402b7650",
    title: "آبی روشن",
    latinTitle: "lightBlue",
    value: "#00c2e0"
  },
  {
    id: "8a1c8a5e-ecc9-489a-9e91-09f51e9f8878",
    title: "سبز",
    latinTitle: "green",
    value: "#61bd4f"
  },
  {
    id: "6fe30746-0c9a-4ebd-b6a5-4c044acdb0df",
    title: "زرد",
    latinTitle: "yellow",
    value: "#f2d600"
  },
  {
    id: "73fc51ca-f1c9-4652-a2cb-382efc020e36",
    title: "نارنجی",
    latinTitle: "orange",
    value: "#ff9f1a"
  },
  {
    id: "2254ae1b-7d31-43c8-9291-d1931e28ab66",
    title: "قرمز",
    latinTitle: "red",
    value: "#eb5a46"
  },
  {
    id: "76e21e55-a6d3-4b7f-97a3-b22d7bf143ea",
    title: "بنفش",
    latinTitle: "purple",
    value: "#c377e0"
  },
  {
    id: "380ee355-bf64-4447-bb48-5c508eb1320e",
    title: "آبی تیره",
    latinTitle: "darkBlute",
    value: "#0079bf"
  }
];
const Pages = {
  Menu: 0,
  Copy: 1,
  Move: 2,
  Sort: 3,
  MoveCards: 4,
  ArchiveCards: 5,
  ArchiveList: 6,
  Color: 7,
  Chart: 8
};

class ListActionsModal extends Component {
  onBoardSelect = async boardId => {
    const moveFormElements = [...this.state.moveFormElements];
    moveFormElements[1].disabled = true;
    moveFormElements[1].model = undefined;
    this.setState({ moveFormElements });
    if (!boardId) {
      return;
    }
    const op = await HttpService.post("/user/boards/lists-count/" + boardId);
    if (op.status !== OperationResultStatus.Success) {
      return;
    }
    moveFormElements[1].disabled = false;
    moveFormElements[1].items = op.data;
    this.setState({ moveFormElements });
  };
  state = {
    visible: false,
    page: Pages.Menu,
    actionListItems: [
      {
        title: "ADD_CARD",
        action: () => {
          this.props.addCard(this.props.data);
          this.close();
        }
      },
      {
        title: "COPY_LIST",
        action: () => this.changePage(Pages.Copy)
      },
      {
        title: "MOVE_LIST",
        action: () => this.changePage(Pages.Move)
      },
      {
        title: "SORT_BY",
        action: () => this.changePage(Pages.Sort)
      },
      {
        title: "BOARD_LIST_ONLY_VISIBLE_BY_ADMIN",
        action: () => {
          // '/user/board-lists/toggle-permission/' + this.props.data.id
        },
        checked: false
      },
      {
        title: "BOARD_LIST_SHOW_CHARTS",
        action: () => this.changePage(Pages.Chart)
      },
      {
        title: "CHANGE_LIST_COLOR",
        action: () => this.changePage(Pages.Color)
      },
      {
        title: "MOVE_ALL_CARDS_IN_THE_LIST",
        action: () => this.changePage(Pages.MoveCards)
      },
      {
        title: "ARCHIVE_ALL_CARDS_IN_THE_LIST",
        action: () => this.changePage(Pages.ArchiveCards)
      },
      {
        title: "ARCHIVE_LIST",
        action: () => this.changePage(Pages.ArchiveList)
      }
    ],
    moveFormElements: [
      {
        type: "dropdown",
        field: "boardId",
        label: I18n.t("BOARD"),
        model: undefined,
        nullable: true,
        items: [],
        disabled: true,
        modelChange: this.onBoardSelect,
        validation: {
          required: true
        }
      },
      {
        type: "dropdown",
        field: "order",
        label: I18n.t("CATEGORY"),
        model: undefined,
        nullable: true,
        items: [],
        disabled: true,
        validation: {
          required: true
        }
      }
    ],
    copyFormElements: [
      {
        type: "input",
        field: "title",
        numberOfLines: 4,
        label: I18n.t("NAME"),
        model: this.props.data?.title,
        validation: {
          required: true
        }
      }
    ]
  };
  componentDidUpdate(prevProps) {
    if (this.props.data?.isOnlyAdmins !== prevProps.data?.isOnlyAdmins) {
      const actionListItems = [...this.state.actionListItems];
      actionListItems.forEach(item => {
        if (item.title === "BOARD_LIST_ONLY_VISIBLE_BY_ADMIN") {
          item.checked = this.props.data.isOnlyAdmins;
        }
      });
      this.setState({ actionListItems });
    }
    if (this.props.data?.title !== prevProps.data?.title) {
      const copyFormElements = [...this.state.copyFormElements];
      copyFormElements[0].model = this.props.data.title;
      this.setState({ copyFormElements });
    }
  }
  sortItems = [
    {
      title: "DATE_CREATED_NEWEST_FIRST",
      value: "time-des"
    },
    {
      title: "DATE_CREATED_OLDEST_FIRST",
      value: "time-asc"
    },
    {
      title: "CARD_NAME_ALPHABETICALLY_ASC",
      value: "alphabet-asc"
    },
    {
      title: "CARD_NAME_ALPHABETICALLY_DES",
      value: "alphabet-des"
    }
  ];
  getBoardsList = async () => {
    const op = await HttpService.post("/user/boards/select-list");
    if (op.status !== OperationResultStatus.Success) {
      return;
    }
    const moveFormElements = [...this.state.moveFormElements];
    moveFormElements[0].items = op.data;
    moveFormElements[0].disabled = false;
    this.setState({ moveFormElements });
  };
  changePage = page => {
    if (page === Pages.Move) {
      this.getBoardsList();
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ page });
  };
  close = () => {
    this.setState({ visible: false });
  };
  open = () => {
    this.setState({
      visible: true,
      page: Pages.Menu
    });
  };
  getTitle = () => {
    let title;
    switch (this.state.page) {
      case Pages.Copy:
        title = "COPY_LIST";
        break;
      case Pages.Move:
        title = "MOVE_LIST";
        break;
      case Pages.Sort:
        title = "SORT_BY";
        break;
      case Pages.Chart:
        title = "BOARD_LIST_SHOW_CHARTS";
        break;
      case Pages.Color:
        title = "CHANGE_LIST_COLOR";
        break;
      case Pages.MoveCards:
        title = "MOVE_ALL_CARDS_IN_THE_LIST";
        break;
      case Pages.ArchiveList:
        title = "ARCHIVE_LIST";
        break;
      case Pages.ArchiveCards:
        title = "ARCHIVE_ALL_CARDS_IN_THE_LIST";
        break;
      default:
        title = "LIST_ACTIONS";
    }
    return I18n.t(title);
  };
  archiveAllCards = () => {
    // '/user/board-lists/cards/archive-all/' + this.props.data.id
    this.close();
  };
  archiveList = () => {
    // '/user/board-lists/toggle-archive/' + this.props.data.id
    this.close();
  };
  moveCardsToList = id => {
    // '/user/board-lists/cards/move-all/' + this.props.data.id, {id}
    this.close();
  };
  changeColor = (id = null) => {
    // '/user/board-lists/change-color/' + this.props.data.id, {id}
  };
  sort = title => {
    // '/user/board-lists/sort-cards/' + this.props.data.id, {title}
    this.close();
  };
  render() {
    return (
      <Modal
        style={ModalStyles.modal}
        isVisible={this.state.visible}
        onBackdropPress={this.close}
        onSwipeComplete={this.close}
        swipeDirection="down"
        propagateSwipe
      >
        <View bg1>
          <View bg2 style={[ModalStyles.header, GS.mt3]}>
            <Left>
              {this.state.page !== Pages.Menu ? (
                <Button onPress={() => this.changePage(Pages.Menu)} transparent>
                  <Icon name="chevron-left" type="Feather" />
                </Button>
              ) : null}
            </Left>
            <Body style={{ flex: 5 }}>
              <Text mute style={ModalStyles.headerTitle}>
                {this.getTitle()}
              </Text>
            </Body>
            <Right />
          </View>
          {this.props.data ? (
            <>
              {(() => {
                switch (this.state.page) {
                  case Pages.ArchiveCards:
                    return (
                      <View padder>
                        <Text>{I18n.t("ARCHIVED_CARDS_DESCRIPTION")}</Text>
                        <Button
                          style={GS.mt2}
                          onPress={this.archiveAllCards}
                          block
                          danger
                          bordered
                        >
                          <Text>{I18n.t("ARCHIVE_ALL")}</Text>
                        </Button>
                      </View>
                    );
                  case Pages.ArchiveList:
                    return (
                      <View padder>
                        <Text>{I18n.t("ARCHIVED_LIST_DESCRIPTION")}</Text>
                        <Button
                          style={GS.mt2}
                          onPress={this.archiveList}
                          block
                          danger
                          bordered
                        >
                          <Text>{I18n.t("ARCHIVE")}</Text>
                        </Button>
                      </View>
                    );
                  case Pages.MoveCards:
                    return (
                      <ScrollView
                        style={{
                          maxHeight: Metrics.HEIGHT - Metrics.modalHeader
                        }}
                      >
                        <List>
                          {this.props.board.lists.map((list, index) => {
                            if (list.id === this.props.data.id) {
                              return null;
                            }
                            return (
                              <ListItem
                                key={list.id}
                                onPress={() => this.moveCardsToList(list.id)}
                                icon
                                dir
                              >
                                <Body>
                                  <Text numberOfLines={1}>{list.title}</Text>
                                </Body>
                              </ListItem>
                            );
                          })}
                        </List>
                      </ScrollView>
                    );
                  case Pages.Color:
                    return (
                      <View
                        style={[
                          GS.flexRowDir,
                          GS.flexWrap,
                          GS.justifyContentCenter
                        ]}
                        padder
                      >
                        <TouchableOpacity
                          onPress={() => this.changeColor(null)}
                        >
                          <View boardList style={Styles.color}>
                            {!this.props.data.colorId ? (
                              <Icon
                                style={{ color: "#fff" }}
                                name="check"
                                type="Feather"
                              />
                            ) : null}
                          </View>
                        </TouchableOpacity>
                        {colors.map(color => {
                          return (
                            <TouchableOpacity
                              onPress={() => this.changeColor(color.id)}
                              style={[
                                Styles.color,
                                { backgroundColor: color.value }
                              ]}
                            >
                              {this.props.data.colorId === color.id ? (
                                <Icon name="check" type="Feather" />
                              ) : null}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  case Pages.Chart:
                    return (
                      <View>
                        <Text>ChartCards</Text>
                      </View>
                    );
                  case Pages.Sort:
                    return (
                      <List>
                        {this.sortItems.map(item => {
                          return (
                            <ListItem
                              key={item.value}
                              onPress={() => this.sort(item.value)}
                              icon
                              dir
                            >
                              <Body>
                                <Text>{I18n.t(item.title)}</Text>
                              </Body>
                            </ListItem>
                          );
                        })}
                      </List>
                    );
                  case Pages.Move:
                    return (
                      <View style={{ height: 300 }} padder>
                        <FormComponent
                          formElements={this.state.moveFormElements}
                          formStyle="regular"
                          labelsStyle={[GS.pt3, GS.pb2]}
                          containerStyle={[GS.flex1, GS.px3]}
                          buttonProps={{ block: true }}
                          buttonTitle={I18n.t("MOVE")}
                          successHandler={this.close}
                          backend={`/user/board-lists/move/${this.props.data.id}`}
                        />
                      </View>
                    );
                  case Pages.Copy:
                    return (
                      <View style={{ height: 250 }} padder>
                        <FormComponent
                          formElements={this.state.copyFormElements}
                          formStyle="regular"
                          labelsStyle={[GS.pt3, GS.pb2]}
                          containerStyle={[GS.flex1, GS.px3]}
                          buttonProps={{ block: true }}
                          buttonTitle={I18n.t("COPY")}
                          successHandler={this.close}
                          backend={`/user/board-lists/copy/${this.props.data.id}`}
                        />
                      </View>
                    );
                  default:
                    return (
                      <List>
                        {this.state.actionListItems.map((item, index) => {
                          if (
                            item.title === "BOARD_LIST_ONLY_VISIBLE_BY_ADMIN" &&
                            this.props.board.permission !==
                              BoardPermission.Admin
                          ) {
                            return null;
                          }
                          return (
                            <ListItem
                              key={item.title}
                              onPress={item.action}
                              icon
                              dir
                            >
                              <Body>
                                <Text>{I18n.t(item.title)}</Text>
                              </Body>
                              {item.checked ? (
                                <Right>
                                  <Icon name="check" type="MaterialIcons" />
                                </Right>
                              ) : null}
                            </ListItem>
                          );
                        })}
                      </List>
                    );
                }
              })()}
            </>
          ) : null}
        </View>
      </Modal>
    );
  }
}

const { func, shape, bool } = PropTypes;
// ListActionsModal.propTypes = {
//   addCard: func,
//   data: shape(BoardListDTO),
//   board: shape(BoardDetailDTO),
// };

export default ListActionsModal;
