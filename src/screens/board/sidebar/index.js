import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  LayoutAnimation,
  SafeAreaView,
  SectionList,
  StatusBar
} from "react-native";
import {
  View,
  Footer,
  Button,
  Container,
  connectStyle,
  Header,
  ListItem,
  Content,
  Icon,
  FooterTab,
  Text,
  Left,
  List,
  Right,
  Body,
  Switch,
  Item,
  Input,
  Segment
} from "native-base";
import GS from "../../../themes/general-styles";
import Svg from "../../../components/elements/svg";
import Styles from "./styles";
import ActivityItem from "../../../components/activity-item";
import LazyLoadFlatList from "../../../components/elements/lazy-load";
import I18n from "../../../i18n";
import { Colors } from "../../../themes/variables";
import {BoardFilterDueDateTypes, BoardStaticFields, Visibility} from "../../../library/enums";
import Thumbnail from "../../../components/elements/thumbnail";
import MembersComponent from "../../../components/members";
import InviteMembersModal from "../../../components/modals/invite-members-modal";
import ChooseBackgroundComponent from "../../../components/choose-background";
import BoardCustomFields from "../../../components/board-custom-fields";
import AttachmentItem from "../../../components/attachment-item";
import BoardListCard from "../../../components/board-list-card";
import Moment from "react-moment";
import LabelsComponent from "../../../components/labels";

const BoardSidebarPages = {
  Background: 1,
  PersonalSettings: 2,
  FilterCards: 3,
  CardElements: 4,
  CustomField: 5,
  Labels: 6,
  ArchivedItems: 7,
  Attachments: 8
};

const MomentText = ({ children }) => {
  return (
    <Text style={GS.px2} note>
      {children}
    </Text>
  );
};

class BoardSidebar extends Component {
  state = {
    activitiesOpen: false,
    shownPage: 0,
    archivedList: false
  };
  cardElements = [];

  componentDidUpdate(prevProps) {
    if (
      prevProps.waiting !== this.props.waiting &&
      this.props.board.id &&
      !this.cardElements.length
    ) {
      this.cardElements = [
        {
          icon: "users",
          value: BoardStaticFields.Members,
          selected: this.props.board.setting.membersOnCard
        },
        {
          icon: "labels",
          value: BoardStaticFields.Labels,
          selected: this.props.board.setting.labelsOnCard
        },
        {
          icon: "calendar-check",
          value: BoardStaticFields.DueDate,
          selected: this.props.board.setting.dueDateOnCard
        },
        {
          icon: "time-slider",
          value: BoardStaticFields.TimeSpent,
          selected: this.props.board.setting.timeSpentOnCard
        },
        {
          icon: "geo-fence",
          value: BoardStaticFields.GeoLocation,
          selected: this.props.board.setting.geoLocationOnCard
        },
        {
          icon: "checklist",
          value: BoardStaticFields.CheckLists,
          selected: this.props.board.setting.checkListsOnCard
        },
        {
          icon: "block",
          value: BoardStaticFields.BlockingCards,
          selected: this.props.board.setting.blockingCardsOnCard
        },
        {
          icon: "poll",
          value: BoardStaticFields.Poll,
          selected: this.props.board.setting.pollOnCard
        },
        {
          icon: "custom-field",
          value: BoardStaticFields.CustomField,
          selected: this.props.board.setting.customFieldOnCard
        },
        {
          icon: "comment",
          value: BoardStaticFields.Comments,
          selected: this.props.board.setting.commentsOnCard
        },
        {
          icon: "attach",
          value: BoardStaticFields.Attachment,
          selected: this.props.board.setting.attachmentOnCard
        },
        {
          icon: "state",
          value: BoardStaticFields.State,
          selected: this.props.board.setting.stateOnCard
        },
        {
          icon: "estimated-time",
          value: BoardStaticFields.EstimatedTime,
          selected: this.props.board.setting.estimatedTimeOnCard
        }
      ];
    }
  }

  changePage = page => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ shownPage: page });
  };
  onBackgroundChange = ({ colorId, pictureId }) => {
    //  TODO: connect this part
    //  only one of them has value, and the other is always undefined
  };
  settingsList = [
    [
      {
        title: "MEMBERS",
        icon: "members",
        action: () => this.refs.members.open()
      },
      {
        title: "CHANGE_BACKGROUND",
        icon: "background",
        action: () => this.changePage(BoardSidebarPages.Background)
      },
      {
        title: "PERSONAL_SETTINGS",
        icon: "settings",
        action: () => this.changePage(BoardSidebarPages.PersonalSettings)
      },
      {
        title: 'FILTER_CARDS',
        icon: 'filter',
        action: () => this.changePage(BoardSidebarPages.FilterCards),
      },
      {
        title: "CARD_ELEMENTS",
        icon: "card-elements",
        action: () => this.changePage(BoardSidebarPages.CardElements)
      },
      {
        title: "CUSTOM_FIELD",
        icon: "custom-field",
        action: () => this.changePage(BoardSidebarPages.CustomField)
      },
      {
        title: "LABELS",
        icon: "labels",
        action: () => this.changePage(BoardSidebarPages.Labels)
      },
      {
        title: "ARCHIVED_ITEMS",
        icon: "archive",
        action: () => this.changePage(BoardSidebarPages.ArchivedItems)
      },
      {
        title: "ATTACHMENTS",
        icon: "attach",
        action: () => this.changePage(BoardSidebarPages.Attachments)
      }
    ],
    [
      {
        title: "SYNC_WITH_GOOGLE_CALENDAR",
        icon: require("../../../assets/images/google_calendar.png"),
        action: () => {}
      }
    ],
    [
      {
        title: "LEAVE_BOARD",
        icon: "exit",
        action: () => {}
      },
      {
        title: "CLOSE_BOARD",
        icon: "close-sign",
        action: () => {}
      }
    ]
  ];
  onClose = skip => {
    const prev = this.state.shownPage;
    this.changePage(0);
    if (prev || skip) {
      return;
    }
    this.props.onClose();
  };
  changeTab = activitiesOpen => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ activitiesOpen });
  };
  returnArchivedCard = cardId => {};
  deleteArchivedCard = cardId => {};
  renderActivities = ({ item }) => {
    return <ActivityItem data={item} />;
  };
  renderAttachments = ({ item }) => {
    return <AttachmentItem data={item} />;
  };
  renderCards = ({ item }) => {
    return (
      <>
        <BoardListCard
          data={item}
          setting={this.props.board.setting}
          navigation={this.props.navigation}
        />
        <View
          style={[
            GS.flexRowDir,
            GS.justifyContentBetween,
            GS.alignItemsCenter,
            GS.mb3,
            { marginTop: -10 }
          ]}
        >
          <View style={GS.flexRowDir}>
            <Button
              onPress={() => this.returnArchivedCard(item.id)}
              transparent
            >
              <Text style={[GS.ps2, GS.pe2]}>{I18n.t("SEND_TO_BOARD")}</Text>
            </Button>
            <Button
              onPress={() => this.deleteArchivedCard(item.id)}
              transparent
            >
              <Text style={[GS.ps2, GS.pe2]}>{I18n.t("DELETE")}</Text>
            </Button>
          </View>
          <Moment locale="fa" element={MomentText} local fromNow>
            {item.archivedAt}
          </Moment>
        </View>
      </>
    );
  };
  renderLists = ({ item }) => {
    return (
      <ListItem style={[GS.flexRowDir, GS.flexWrap]}>
        <Text>{item.title}</Text>
        <Button style={GS.meAuto} transparent>
          <Text style={[GS.ps2, GS.pe2]}>{I18n.t("SEND_TO_BOARD")}</Text>
        </Button>
      </ListItem>
    );
  };

  visibilityIcon = () => {
    switch (this.props.board.visibility) {
      case Visibility.Organization:
        return "organization";
      case Visibility.Team:
        return "users";
      case Visibility.Public:
        return "earth";
      default:
        return "user";
    }
  };
  toggleStar = () => {
    alert("toggleStar");
  };

  render() {
    if (this.props.waiting || !this.props.board.id) {
      return (
        <View style={GS.waitingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <Container>
        <Header style={Styles.header} dir>
          <Left>
            <Button onPress={this.toggleStar} dark small transparent>
              <Icon
                style={[
                  GS.headerIcon,
                  this.props.board.starred ? { color: Colors.starred } : null
                ]}
                name="star"
                type="Feather"
              />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <View style={[GS.flexRowDir, GS.px2]}>
              <Svg name={this.visibilityIcon()} />
              <Text style={GS.px2} numberOfLines={1}>
                {this.props.board.team?.title ||
                  I18n.enum("Visibility", this.props.board.visibility || 1)}
              </Text>
            </View>
          </Body>
          <Right>
            <Button onPress={() => this.onClose()} dark small transparent>
              <Icon
                style={GS.headerIcon}
                name={this.state.shownPage ? "chevron-left" : "close"}
                type={this.state.shownPage ? "Feather" : "AntDesign"}
              />
            </Button>
          </Right>
        </Header>
        <StatusBar
          translucent
          backgroundColor="#0000"
          barStyle="light-content"
        />
        {this.state.activitiesOpen ? (
          <View bg2 style={GS.flex1}>
            <LazyLoadFlatList
              backend={"/user/activities/board/list/" + this.props.board.id}
              flatListProps={{
                contentContainerStyle: [GS.flexGrow1, GS.px2, GS.py2],
                renderItem: this.renderActivities,
                keyExtractor: item => item.id
              }}
            />
          </View>
        ) : (
          <>
            {(() => {
              switch (this.state.shownPage) {
                case BoardSidebarPages.Background:
                  return (
                    <ChooseBackgroundComponent
                      color={this.props.board.color}
                      picture={this.props.board.picture}
                      modelChange={this.onBackgroundChange}
                    />
                  );
                case BoardSidebarPages.Attachments:
                  return (
                    <LazyLoadFlatList
                      backend={
                        "/user/boards/attachments/" + this.props.board.id
                      }
                      flatListProps={{
                        contentContainerStyle: [GS.flexGrow1, GS.px2, GS.py2],
                        renderItem: this.renderAttachments,
                        keyExtractor: item => item.id
                      }}
                    />
                  );
                case BoardSidebarPages.ArchivedItems:
                  return (
                    <>
                      <View style={GS.px2} bg1>
                        <Item rounded custom dir>
                          <Icon name="search" />
                          <Input
                            placeholder={I18n.t("FILTER")}
                            clearButtonMode="while-editing"
                          />
                        </Item>
                      </View>
                      <Segment>
                        <Button
                          onPress={() => this.setState({ archivedList: false })}
                          active={!this.state.archivedList}
                          first
                        >
                          <Text>{I18n.t("CARDS")}</Text>
                        </Button>
                        <Button
                          onPress={() => this.setState({ archivedList: true })}
                          active={this.state.archivedList}
                          last
                        >
                          <Text>{I18n.t("LISTS")}</Text>
                        </Button>
                      </Segment>
                      {this.state.archivedList ? (
                        <View style={GS.flex1}>
                          <LazyLoadFlatList
                            backend={
                              "/user/board-lists/list-archived/" +
                              this.props.board.id
                            }
                            flatListProps={{
                              contentContainerStyle: [
                                GS.flexGrow1,
                                GS.px2,
                                GS.py2
                              ],
                              renderItem: this.renderLists,
                              keyExtractor: item => item.id
                            }}
                          />
                        </View>
                      ) : (
                        <LazyLoadFlatList
                          backend={
                            "/user/cards/list-archived/" + this.props.board.id
                          }
                          flatListProps={{
                            contentContainerStyle: [
                              GS.flexGrow1,
                              GS.px2,
                              GS.py2
                            ],
                            renderItem: this.renderCards,
                            keyExtractor: item => item.id
                          }}
                        />
                      )}
                    </>
                  );
                case BoardSidebarPages.CardElements:
                  return (
                    <Content contentContainerStyle={GS.flexGrow1} background>
                      <List>
                        <ListItem itemDivider />
                        {this.cardElements.map((el, idx) => {
                          return (
                            <ListItem key={`${el.value}`} icon dir>
                              <Left>
                                <Svg name={el.icon} />
                              </Left>
                              <Body>
                                <Text>
                                  {I18n.enum("BoardStaticFields", el.value)}
                                </Text>
                              </Body>
                              <Right>
                                <Switch
                                  value={el.selected}
                                  onValueChange={() => {}}
                                />
                              </Right>
                            </ListItem>
                          );
                        })}
                        <ListItem itemDivider />
                      </List>
                    </Content>
                  );
                case BoardSidebarPages.CustomField:
                  return (
                    <Content contentContainerStyle={GS.flexGrow1} background>
                      <BoardCustomFields
                        boardId={this.props.board.id}
                        customFields={this.props.board.customFields}
                      />
                    </Content>
                  );
                case BoardSidebarPages.FilterCards:
                  //TODO change this
                  const labels = [
                    {
                      id: "0ce9e8b2-759b-445e-883d-cf11afc67e17",
                      title: "test",
                      value: "#ffa2b3",
                      selected: false
                    },
                    {
                      id: "0ce9e8b1-759b-445e-883d-cf11afc67e17",
                      title: "test",
                      value: "#f683ff",
                      selected: false
                    },
                    {
                      id: "286c5182-ee5f-4031-8fc8-a85d446d6a87",
                      title: "sass",
                      value: "#61bd4f",
                      selected: false
                    },
                    {
                      id: "3f0db13c-59db-4629-9254-c708eb3c6919",
                      title: "خیلی مهم",
                      value: "#eb5a46",
                      selected: false
                    },
                    {
                      id: "402924d1-4c07-4e41-a96f-8e170e06897b",
                      title: "pink!!!!",
                      value: "#ff78cb",
                      selected: false
                    },
                    {
                      id: "42f88215-1573-4fe5-8139-9270e64121d9",
                      title: null,
                      value: "#00c2e0",
                      selected: false
                    },
                    {
                      id: "5ed684a8-3b60-44b8-bd21-0cdcbef4b90a",
                      title: null,
                      value: "#344563",
                      selected: false
                    },
                    {
                      id: "973c21d4-4ce6-4b5f-bb6e-cb55b30f620f",
                      title: "lamda pro cs",
                      value: "#0079bf",
                      selected: false
                    },
                    {
                      id: "b070209e-d555-4ea6-983c-ac54d4543af6",
                      title: null,
                      value: "#c377e0",
                      selected: false
                    },
                    {
                      id: "d64c1b62-4972-471e-af08-d022cbaa1d48",
                      title: "خیلی خیلی مهم",
                      value: "#51e898",
                      selected: false
                    },
                    {
                      id: "d922bf98-56e1-4e74-850b-feabe94bffa7",
                      title: "warning",
                      value: "#f2d600",
                      selected: false
                    }
                  ];
                  return (
                    <Content
                      contentContainerStyle={GS.flexGrow1}
                      background
                    >
                      <List>
                        <ListItem itemDivider>
                          <Item rounded custom dir>
                            <Icon name="search" />
                            <Input
                              placeholder={I18n.t("FILTER")}
                              clearButtonMode="while-editing"
                            />
                          </Item>
                        </ListItem>
                        <ListItem dir icon first>
                          <Left>
                            <View style={Styles.labelIcon}/>
                          </Left>
                          <Body>
                            <Text>{I18n.t('WITHOUT_LABEL')}</Text>
                          </Body>
                          <Right>
                            <Icon name="check" type="MaterialIcons" />
                          </Right>
                        </ListItem>
                        {labels.map(label => {
                          return (
                            <ListItem key={label.id} dir icon>
                              <Left>
                                <View style={[Styles.labelIcon, {backgroundColor: label.value}]}/>
                              </Left>
                              <Body>
                                <Text note={!label.title}>{label.title || I18n.t('NO_NAME')}</Text>
                              </Body>
                              <Right>
                                <Icon name="check" type="MaterialIcons" />
                              </Right>
                            </ListItem>
                          );
                        })}
                        <ListItem itemDivider/>
                        <ListItem dir icon first>
                          <Left>
                            <Thumbnail
                              extraSmall
                              title="?"
                            />
                          </Left>
                          <Body>
                            <Text>{I18n.t('WITHOUT_LABEL')}</Text>
                          </Body>
                          <Right>
                            <Icon name="check" type="MaterialIcons" />
                          </Right>
                        </ListItem>
                        {(this.props.board?.members || []).map(member => {
                          return (
                            <ListItem key={member.id} dir icon>
                              <Left>
                                <Thumbnail
                                  extraSmall
                                  title={member.initials}
                                  source={member.avatar}
                                />
                              </Left>
                              <Body>
                                <Text numberOfLines={1}>{member.fullName}</Text>
                              </Body>
                              <Right>
                                <Icon name="check" type="MaterialIcons" />
                              </Right>
                            </ListItem>
                          );
                        })}
                        <ListItem itemDivider/>
                        {Object.keys(BoardFilterDueDateTypes).map((dueStatus, i) => {
                          const last = Object.keys(BoardFilterDueDateTypes).length === i - 1;
                          return (
                            <ListItem
                              key={dueStatus}
                              first={!i}
                              last={last}
                              dir icon>
                              <Left/>
                              <Body>
                                <Text>
                                  {I18n.enum(
                                    'BoardFilterDueDateTypes',
                                    BoardFilterDueDateTypes[dueStatus]
                                  )}
                                </Text>
                              </Body>
                              <Right>
                                <Icon name="check" type="MaterialIcons" />
                              </Right>
                            </ListItem>
                          );
                        })}
                        <ListItem itemDivider/>
                        <ListItem first dir icon>
                          <Left/>
                          <Body>
                            <Text>
                              {I18n.t('BOARD_MATCHES_ANY')}
                            </Text>
                          </Body>
                          <Right>
                            <Icon name="check" type="MaterialIcons" />
                          </Right>
                        </ListItem>
                        <ListItem last dir icon>
                          <Left/>
                          <Body>
                            <Text>
                              {I18n.t('BOARD_MATCHES_ALL')}
                            </Text>
                          </Body>
                          <Right>
                            <Icon name="check" type="MaterialIcons" />
                          </Right>
                        </ListItem>
                        <ListItem itemDivider/>
                        <ListItem first last dir icon>
                          <Left/>
                          <Body>
                            <Text>
                              {I18n.t('BOARD_CLEAR_FILTER')}
                            </Text>
                          </Body>
                        </ListItem>
                        <ListItem itemDivider/>
                      </List>
                    </Content>
                  );
                case BoardSidebarPages.PersonalSettings:
                  return (
                    <Content contentContainerStyle={GS.flexGrow1} background>
                      <List>
                        <ListItem itemDivider />
                        <ListItem dir icon>
                          <Body>
                            <Text>
                              {I18n.t(
                                "BOARD__LIST_SETTINGS__SHOW_DONE_CARDS_COUNT"
                              )}
                            </Text>
                          </Body>
                          <Right>
                            <Switch />
                          </Right>
                        </ListItem>
                        <ListItem dir icon>
                          <Body>
                            <Text>{I18n.t("BLOCK_NOTIFICATION")}</Text>
                          </Body>
                          <Right>
                            <Switch />
                          </Right>
                        </ListItem>
                      </List>
                    </Content>
                  );
                case BoardSidebarPages.Labels:
                  return (
                    <Content
                      contentContainerStyle={[GS.flexGrow1, GS.px2, GS.py2]}
                      alwaysBounceVertical={!this.state.createLabelPage}
                      background
                    >
                      <LabelsComponent
                        pageChange={createLabelPage => this.setState({createLabelPage})}
                        boardId={this.props.board.id}
                      />
                    </Content>
                  );
                default:
                  return (
                    <Content contentContainerStyle={GS.flexGrow1} background>
                      <List>
                        {/*<ListItem last icon dir>*/}
                        {/*  <Left>*/}
                        {/*    <Svg name="members"/>*/}
                        {/*  </Left>*/}
                        {/*  <Body>*/}
                        {/*    <Text>*/}
                        {/*      {I18n.t('MEMBERS')}*/}
                        {/*    </Text>*/}
                        {/*  </Body>*/}
                        {/*</ListItem>*/}
                        {/*<ListItem itemDivider>*/}
                        {/*  <Body>*/}
                        {/*    <MembersComponent*/}
                        {/*      items={this.props.board?.members || []}*/}
                        {/*      maxShown={9}*/}
                        {/*      style={GS.flexWrap}*/}
                        {/*      itemsStyle={[GS.mb3, GS.mx2]}*/}
                        {/*      small*/}
                        {/*    />*/}
                        {/*    <Button bordered block>*/}
                        {/*      <Text>{I18n.t('INVITE')}</Text>*/}
                        {/*    </Button>*/}
                        {/*  </Body>*/}
                        {/*</ListItem>*/}
                        {this.settingsList.map((arr, index) => {
                          return (
                            <React.Fragment key={"fragment-" + index}>
                              {arr.map((item, idx) => {
                                const first = idx === 0;
                                const last = idx === arr.length - 1;
                                return (
                                  <ListItem
                                    first={first}
                                    last={last}
                                    key={item.title}
                                    onPress={item.action}
                                    icon
                                    dir
                                  >
                                    <Left>
                                      {item.icon === "background" ? (
                                        <Thumbnail
                                          extraSmall
                                          source={this.props.board.picture}
                                          color={this.props.board.color}
                                        />
                                      ) : typeof item.icon === "number" ? (
                                        <Image
                                          style={GS.imageIcon}
                                          source={item.icon}
                                          resizeMode="contain"
                                        />
                                      ) : (
                                        <Svg name={item.icon} />
                                      )}
                                    </Left>
                                    <Body>
                                      <Text>{I18n.t(item.title)}</Text>
                                    </Body>
                                  </ListItem>
                                );
                              })}
                              <ListItem key={"divider-" + index} itemDivider />
                            </React.Fragment>
                          );
                        })}
                        <InviteMembersModal
                          data={this.props.board?.members}
                          boardId={this.props.board?.id}
                          permission={this.props.board?.permission}
                          onRemoveUser={() => {}}
                          ref="members"
                        />
                      </List>
                    </Content>
                  );
              }
            })()}
          </>
        )}
        <Footer>
          <FooterTab>
            <Button
              onPress={() => this.changeTab(false)}
              active={!this.state.activitiesOpen}
            >
              <Text>{I18n.t("SETTINGS")}</Text>
            </Button>
            <Button
              style={{ marginTop: 0 }}
              onPress={() => this.changeTab(true)}
              active={this.state.activitiesOpen}
            >
              <Text>{I18n.t("ACTIVITY")}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default connectStyle("Custom.GeneralColors")(BoardSidebar);
