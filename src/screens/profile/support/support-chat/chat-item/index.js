import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Left } from "native-base";
import Hyperlink from "react-native-hyperlink";
import PropTypes from "prop-types";
import Thumbnail from "../../../../../components/elements/thumbnail";
import IdentityService from "../../../../../services/identity-service";
import Styles from "../../../../chat/chat-field/styles";
import Moment from "react-moment";
import I18n from "../../../../../i18n";
const { string, bool } = PropTypes;

export default class SupportChatItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
      createdAt: string,
      id: string,
      description: string,
      isAdminReply: bool,
      seenByAdmin: bool,
      seenByUser: bool
    }),
    first: PropTypes.bool
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }
  DateText = props => (
    <Text style={[Styles.chatDate, this.yourChat ? Styles.yourChatDate : null]}>
      {props.children}
    </Text>
  );
  yourChat = !this.props.data.isAdminReply;
  render() {
    return (
      <View
        style={[Styles.chatItem, this.yourChat ? Styles.yourChatItem : null]}
      >
        {!this.yourChat ? (
          <View style={{ width: 32 }}>
            {this.props.first ? (
              <Thumbnail extraSmall icon={{ name: "headset" }} />
            ) : null}
          </View>
        ) : null}
        <TouchableOpacity
          activeOpacity={1}
          style={[
            Styles.messageBox,
            this.yourChat ? Styles.yourMessageBox : null
          ]}
        >
          {this.props.first && !this.yourChat ? (
            <View style={Styles.chatHeader}>
              <Text style={Styles.chatName} numberOfLines={1}>
                {I18n.t("SUPPORT")}
              </Text>
            </View>
          ) : null}
          <Hyperlink
            linkDefault
            linkStyle={{ color: this.yourChat ? "#5cd2ff" : "#1d96ff" }}
          >
            <Text
              style={[
                Styles.chatMessage,
                this.yourChat ? Styles.yourChatMessage : null
              ]}
            >
              {this.props.data.description}
            </Text>
          </Hyperlink>
        </TouchableOpacity>
        <View>
          <Moment
            locale="fa"
            element={this.DateText}
            local
            // format="HH:mm"
            fromNow
          >
            {this.props.data.createdAt}
          </Moment>
        </View>
      </View>
    );
  }
}
