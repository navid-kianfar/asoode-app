import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard, LayoutAnimation,
  StatusBar,
  TouchableOpacity
} from "react-native";
import {
  Container,
  View,
  Item,
  Input,
  Button,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  connectStyle
} from "native-base";
import ChatFieldItem from "./chat-field-item";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import ChatService from "../../../services/chat-service";
import * as Enums from "../../../library/enums";
import { connect } from "react-redux";
import AttachmentModal from "../../../components/modals/attachment-modal";
import Styles from "../../../components/elements/date-picker-modal/styles";
import SimpleHeaderComponent from "../../../components/simple-header";
import Thumbnail from "../../../components/elements/thumbnail";
import AppNavigator from "../../../navigations";
import KeyboardAvoidingView from "../../../components/elements/keyboard-avoiding-view";
class ChatField extends Component {
  state = {
    showOptions: undefined,
  };
  id = "";
  title = "";
  avatar = "";
  category = "";
  section = "";

  componentDidMount() {
    this.id = this.props.navigation.getParam("id");
    this.category = this.props.navigation.getParam("category");
    this.title = this.props.navigation.getParam("title");
    this.avatar = this.props.navigation.getParam("avatar");
    switch (this.category) {
      case Enums.ChatCategory.Board:
        this.section = "board";
        break;
      case Enums.ChatCategory.Team:
        this.section = "team";
        break;
      case Enums.ChatCategory.Organ:
        this.section = "organ";
        break;
      default:
        this.section = "private";
        break;
    }
    this.props.refresh(this.section, this.id);
  }
  goBack = () => {
    this.props.navigation.goBack(null);
  };
  goToChatDetails = () => {
    this.props.navigation.navigate("ChatDetailsScreen");
  };
  changeOpenOption = showOptions => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({showOptions});
  };
  renderChatItem = ({ item, index }) => {
    const nextItem = this.props.dataSource.items[index + 1];
    const first = !(nextItem && nextItem.senderId === item.senderId);
    return (
      <ChatFieldItem
        first={first}
        data={item}
        navigation={this.props.navigation}
        openImageModal={this.openImageModal}
        optionsVisible={this.state.showOptions === item.id}
        optionsVisibleChange={o => this.changeOpenOption(o)}
      />
    );
  };
  openAttachment = () => {
    Keyboard.dismiss();
    this.refs.attachModal.open();
  };
  sendMessage = () => {
    alert("sendMessage");
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <Container light>
          <StatusBar translucent={false} />
          <SimpleHeaderComponent
            navigation={this.props.navigation}
            title={this.title}
            rightInnerComponent={
              <Thumbnail
                onPress={this.goToChatDetails}
                source={this.avatar}
                title={this.title}
                extraSmall
              />
            }
          />
          {this.props.dataSource.waiting ? (
            <View style={GS.waitingContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <>
              <FlatList
                style={GS.zIndexM}
                data={this.props.dataSource.items}
                extraData={this.state.showOptions}
                renderItem={this.renderChatItem}
                keyExtractor={(_, i) => `${i}`}
                windowSize={10}
                initialNumToRender={12}
                inverted
              />
            </>
          )}
          <View style={[this.props.style.backBg_1, GS.iphoneXBottom]}>
            <Item style={{ alignItems: "flex-end" }} noBorder>
              <AttachmentModal ref="attachModal">
                <Button onPress={this.openAttachment} transparent dark>
                  <Icon name="ios-attach" type="Ionicons" />
                </Button>
              </AttachmentModal>
              <Input
                placeholder={I18n.t("CHAT_INPUT_PLACEHOLDER")}
                multiline
                style={{ maxHeight: 150, alignSelf: "center" }}
              />
              <Button onPress={this.sendMessage} transparent>
                <Icon name="md-send" type="Ionicons" />
              </Button>
            </Item>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
const StyledChatField = connectStyle("Custom.GeneralColors")(ChatField);

const mapStateToProps = state => ({
  dataSource: state.chatDetail
});
const mapDispatchToProps = dispatch => ({
  refresh: (section, id) => ChatService.detail(dispatch, section, id)
});
export default connect(mapStateToProps, mapDispatchToProps)(StyledChatField);
