import React, { Component } from "react";

import {
  FlatList,
  SectionList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import {
  View,
  Text,
  Item,
  Input,
  Icon,
  ListItem,
  Left,
  Body,
  Right,
  Badge,
  connectStyle
} from "native-base";
import I18n from "../../../i18n";
import { default as Enums, TeamVisibility } from "../../../library/enums";
import GS from "../../../themes/general-styles";
import Styles from "./styles";
import ActionNames from "../../../reducers/action-names";
import HttpService from "../../../services/http-service";
import { connect } from "react-redux";
import Thumbnail from "../../../components/elements/thumbnail";
import { TeamsScreen } from "../../teams";

class ChatSidebar extends Component {
  keyExtractor = (_, i) => i;
  listHeader = () => {
    return (
      <View style={[GS.mt3, GS.mb1, GS.mx3]}>
        <Item rounded custom dir>
          <Icon name="search" />
          <Input
            placeholder={I18n.t("FILTER")}
            clearButtonMode="while-editing"
          />
        </Item>
      </View>
    );
  };
  renderHeader = ({ section: { title } }) => {
    return (
      <ListItem style={[GS.pb2, GS.pt2]} hasBackground itemHeader dir>
        <Body>
          <Text style={this.props.style.colorText_2}>{title}</Text>
        </Body>
      </ListItem>
    );
  };
  goToChat = item => {
    this.props.navigation.navigate("ChatField", item);
    this.props.navigation.closeDrawer();
  };
  renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => this.goToChat(item)}
        avatar
        dir
        style={[GS.border0, GS.py2]}
      >
        <Left>
          <Thumbnail small source={item.avatar} title={item.title} />
        </Left>
        <Body>
          <Text>{item.title}</Text>
        </Body>
        <Right>
          {item.newMessages ? (
            <Badge success>
              <Text>{item.newMessages}</Text>
            </Badge>
          ) : null}
        </Right>
      </ListItem>
    );
  };
  render() {
    const sections = [
      {
        title: I18n.t("BOARDS"),
        data: this.props.dataSource.boards
      },
      {
        title: I18n.t("TEAMS"),
        data: this.props.dataSource.teams
      },
      {
        title: I18n.t("ORGANISATIONS"),
        data: this.props.dataSource.organs
      }
    ];
    return (
      <SafeAreaView style={[GS.flex1, this.props.style.backBg_1]}>
        <SectionList
          contentContainerStyle={[
            this.props.style.backBg_1,
            GS.flexGrow1,
            GS.pb4
          ]}
          keyExtractor={this.keyExtractor}
          sections={sections}
          ListHeaderComponent={this.listHeader}
          renderSectionHeader={this.renderHeader}
          renderItem={this.renderItem}
          stickySectionHeadersEnabled={true}
        />
      </SafeAreaView>
    );
  }
}
const StyledChatSidebar = connectStyle("Custom.GeneralColors")(ChatSidebar);
const mapStateToProps = state => ({
  dataSource: state.chat
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StyledChatSidebar);
