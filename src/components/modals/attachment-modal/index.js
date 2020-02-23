import React, { Component } from "react";
import {
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
  ActivityIndicator
} from "react-native";
import Modal from "../../elements/modal";
import {
  View,
  Text,
  List,
  ListItem,
  Button,
  Body,
  Right,
  Left,
  Segment,
  Header,
  Picker,
  Item,
  Icon,
  Input
} from "native-base";
import DatePicker from "../../elements/date-picker";
import I18n from "../../../i18n";
import _ from "lodash";
import PropTypes from "prop-types";
import Styles from "./styles";
import AttachmentService from "../../../services/attachment-service";
import DeviceService from "../../../services/device-service";
import Image from "../../elements/image";
import GS from "../../../themes/general-styles";
import { AttachmentType, OperationResultStatus } from "../../../library/enums";

const images = {
  googleDrive: require("../../../assets/images/attachment-icons/google-drive.png"),
  camera: require("../../../assets/images/attachment-icons/camera.png"),
  maps: require("../../../assets/images/attachment-icons/maps.png"),
  gallery: require("../../../assets/images/attachment-icons/Photos.png"),
  file: require("../../../assets/images/attachment-icons/files.png"),
  dropbox: require("../../../assets/images/attachment-icons/dropbox.png"),
  anyTeam: require("../../../assets/images/attachment-icons/anyteam.png")
};
export default class AttachmentModal extends Component {
  static propTypes = {
    blockingCard: PropTypes.bool,
    fileManager: PropTypes.bool,
  };
  state = {
    query: "",
    waiting: false,
    visible: false,
    anyTeamAttachment: false,
    cardList: [],
    boardList: []
  };
  onGoogleDrivePress = () => {
    alert("googleDrive");
  };
  options = [
    {
      title: I18n.t("CAMERA"),
      image: images.camera,
      action: () => {
        DeviceService.imageCamera().then(
          image => {
            console.log(image);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    {
      title: I18n.t("GALLERY"),
      image: images.gallery,
      action: () => {
        DeviceService.imagePicker().then(
          image => {
            console.log(image);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    // {
    //   title: I18n.t("DOCUMENTS"),
    //   image: images.camera,
    //   action: () => {
    //     DeviceService.documentPicker().then((image) => {
    //       console.log(image);
    //     }, (err) => {
    //       console.log(err);
    //     })
    //   }
    // },
    {
      title: I18n.t("FILES"),
      image: images.file,
      action: () => alert("Files"),
      hidden: this.props.fileManager
    },
    {
      title: I18n.t("LOCATION"),
      image: images.maps,
      action: () => alert("Location"),
      hidden: this.props.fileManager
    },
    {
      title: I18n.t("ATTACHMENT_FROM_ASOODE"),
      image: images.anyTeam,
      action: () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ anyTeamAttachment: true });
      },
      hidden: this.props.fileManager
    }
    // {
    //   title: I18n.t("GOOGLE_DRIVE"),
    //   image: images.googleDrive,
    //   action: this.onGoogleDrivePress
    // },
    // {
    //   title: I18n.t("DROPBOX"),
    //   image: images.dropbox,
    //   action: () => alert("dropbox")
    // }
  ];
  goBack = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ anyTeamAttachment: false });
  };
  open = () => {
    this.setState({
      visible: true,
      anyTeamAttachment: false
    });
  };
  close = () => {
    this.setState({
      visible: false
    });
  };
  attachItem = item => {
    const attachmentType = this.state.showBoards
      ? AttachmentType.Board
      : AttachmentType.Card;
    alert(item.title);
  };
  renderSearchedItems = ({ item }) => {
    return (
      <ListItem onPress={() => this.attachItem(item)} style={GS.py0} dir>
        <Body>
          <Text>{item.title}</Text>
          <Text note>
            {item.boardTitle !== item.title ? item.boardTitle : item.teamTitle}
          </Text>
        </Body>
      </ListItem>
    );
  };
  renderEmpty = () => null;
  showBoards = bool => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showBoards: bool });
  };
  filter = val => {
    this.setState({ query: val });
    this.filterDebounce(val);
  };
  filterDebounce = _.debounce(async val => {
    val = (val || "").trim();
    if (!val) {
      this.setState({
        cardList: [],
        boardList: []
      });
      return;
    }
    this.setState({ waiting: true });
    const op = await AttachmentService.filterBoardAndCards(val);
    if (op.status !== OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    this.setState({
      waiting: false,
      cardList: op.data.cardList,
      boardList: op.data.boardList
    });
  }, 800);
  render() {
    return (
      <>
        <TouchableOpacity
          style={this.props.style}
          activeOpacity={0.7}
          onPress={this.open}
        >
          {this.props.children ? (
            this.props.children
          ) : (
            <Text>Backup Button</Text>
          )}
        </TouchableOpacity>
        <Modal
          style={Styles.modal}
          isVisible={this.state.visible}
          onBackdropPress={this.close}
          onSwipeComplete={this.close}
          swipeDirection="down"
          propagateSwipe
        >
          {this.state.anyTeamAttachment || this.props.blockingCard ? (
            <View style={GS.h100} bg1>
              <Header style={Styles.header} darker searchBar rounded>
                <Left>
                  <Button
                    onPress={this.props.blockingCard ? this.close : this.goBack}
                    dark
                    transparent
                  >
                    <Icon
                      style={Styles.icon}
                      name="chevron-left"
                      type="Feather"
                    />
                  </Button>
                </Left>
                <Body style={{ flex: 5 }}>
                  <Item noBorder style={GS.my2} dir>
                    <Icon name="search" />
                    <Input
                      value={this.state.query}
                      onChangeText={val => this.filter(val)}
                      placeholder={I18n.t("SEARCH")}
                      clearButtonMode="while-editing"
                      autoFocus
                    />
                  </Item>
                </Body>
              </Header>
              <View style={GS.flex1}>
                {!this.props.blockingCard ? (
                  <Segment>
                    <Button
                      onPress={() => this.showBoards(false)}
                      active={!this.state.showBoards}
                      first
                    >
                      <Text>{I18n.t("CARDS")}</Text>
                    </Button>
                    <Button
                      onPress={() => this.showBoards(true)}
                      active={this.state.showBoards}
                      last
                    >
                      <Text>{I18n.t("BOARDS")}</Text>
                    </Button>
                  </Segment>
                ) : null}
                {this.state.waiting ? (
                  <View style={GS.waitingContainer}>
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <FlatList
                    style={GS.zIndexM}
                    contentContainerStyle={[GS.flexGrow1, GS.pb5]}
                    data={
                      this.state.showBoards || !this.props.blockingCard
                        ? this.state.boardList
                        : this.state.cardList
                    }
                    ListEmptyComponent={this.renderEmpty}
                    renderItem={this.renderSearchedItems}
                    keyExtractor={item => item.id}
                  />
                )}
              </View>
            </View>
          ) : (
            <View bg1>
              <View bg2 style={[Styles.header, GS.mt3]}>
                <Text mute style={Styles.headerTitle}>
                  {I18n.t("SHARE")}
                </Text>
              </View>
              <List transparent style={GS.my3}>
                {this.options.map((option, i) => {
                  if (option.hidden) { return null; }
                  return (
                    <ListItem
                      key={i.toString()}
                      onPress={option.action}
                      dir
                      noBorder
                      icon
                    >
                      <Left>
                        <Image
                          containerStyle={Styles.image}
                          style={Styles.image}
                          source={option.image}
                        />
                      </Left>
                      <Body>
                        <Text>{option.title}</Text>
                      </Body>
                    </ListItem>
                  );
                })}
              </List>
            </View>
          )}
        </Modal>
      </>
    );
  }
}
