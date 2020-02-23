import React, { Component } from "react";
import { ActivityIndicator, FlatList, Keyboard, StatusBar } from "react-native";
import {
  Container,
  View,
  Item,
  Input,
  Button,
  Icon,
  connectStyle
} from "native-base";
import KeyboardAvoidingView from "../../../../components/elements/keyboard-avoiding-view";
import SupportChatItem from "./chat-item";
import I18n from "../../../../i18n";
import GS from "../../../../themes/general-styles";
import IdentityService from "../../../../services/identity-service";
import * as Enums from "../../../../library/enums";
import { connect } from "react-redux";
import SimpleHeaderComponent from "../../../../components/simple-header";
import Thumbnail from "../../../../components/elements/thumbnail";
import ActionNames from "../../../../reducers/action-names";
class SupportChat extends Component {
  id = "";
  title = "";
  avatar = "";
  category = "";
  section = "";
  state = {
    message: ''
  };
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
    this.props.refresh(this.id);
  }
  goBack = () => {
    this.props.navigation.goBack(null);
  };
  renderChatItem = ({ item, index }) => {
    const nextItem = this.props.dataSource.detail[index + 1];
    const first = !(
      nextItem &&
      nextItem.isAdminReply &&
      nextItem.isAdminReply === item.isAdminReply
    );
    return (
      <SupportChatItem
        first={first}
        data={item}
        navigation={this.props.navigation}
      />
    );
  };
  sendMessage = () => {
    const msg = (this.state.message || '').trim();
    if (!msg) { return; }
    this.setState({message: ''});
    this.props.sendMessage(this.id, msg);
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
              <Thumbnail extraSmall icon={{ name: "headset" }} />
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
                data={this.props.dataSource.detail}
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
              <Input
                value={this.state.message}
                onChangeText={val => this.setState({message: val})}
                placeholder={I18n.t("CHAT_INPUT_PLACEHOLDER")}
                multiline
                style={{ maxHeight: 150, alignSelf: "center" }}
              />
              <Button disabled={this.props.dataSource.sending}
                      onPress={this.sendMessage} transparent>
                <Icon name="md-send" type="Ionicons" />
              </Button>
            </Item>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
const StyledChatField = connectStyle("Custom.GeneralColors")(SupportChat);

const mapStateToProps = state => ({
  dataSource: state.support
});
const mapDispatchToProps = dispatch => ({
  refresh: id => IdentityService.supportDetail(dispatch, id),
  sendMessage: (id, message) => IdentityService.supportMessage(dispatch, id, message)
});
export default connect(mapStateToProps, mapDispatchToProps)(StyledChatField);
