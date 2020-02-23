import React, { Component } from "react";
import {
  StatusBar,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  FooterTab,
  H2,
  Item,
  Input,
  Title
} from "native-base";
import Styles from "./styles";
import ActionNames from "../../reducers/action-names";
import CardService from "../../services/card-service";
import { connect } from "react-redux";
import I18n from "../../i18n";
import GS from "../../themes/general-styles";
import CardPropertiesTab from "./properties";
import CardCommentsTab from "./comments";
import CardActivitiesTab from "./activities";
import CardAttachmentsTab from "./attachments";
import AttachmentModal from "../../components/modals/attachment-modal";
import KeyboardAvoidingView from "../../components/elements/keyboard-avoiding-view";
const CardTabs = {
  Properties: 1,
  Comments: 2,
  Activities: 3,
  Attachments: 4
};
const tabs = [
  {
    title: "PROPERTIES",
    tab: CardTabs.Properties
  },
  {
    title: "COMMENTS",
    tab: CardTabs.Comments
  },
  {
    title: "ACTIVITY",
    tab: CardTabs.Activities
  },
  {
    title: "ATTACHMENTS",
    tab: CardTabs.Attachments
  }
];
class CardScreen extends Component {
  state = {
    openTab: CardTabs.Properties,
    titleHeight: 64,
    showTitleOnHeader: false
  };
  id = "";
  title = this.props.navigation.getParam("title");
  componentDidMount() {
    this.id = this.props.navigation.getParam("id");
    this.props.refresh(this.id, false);
  }
  componentWillUnmount() {
    this.props.remove(this.id);
  }
  goBack = () => {
    this.props.navigation.goBack(null);
  };
  changeTab = openTab => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ openTab });
  };
  titleHeightChange = event => {
    const titleHeight = event.nativeEvent.layout.height;
    this.setState({ titleHeight });
  };
  onScroll = event => {
    const showTitleOnHeader =
      event.nativeEvent.contentOffset.y > this.state.titleHeight;
    if (showTitleOnHeader === this.state.showTitleOnHeader) {
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showTitleOnHeader });
  };

  render() {
    const card = this.props.dataSource.cards[this.id];
    return (
      <KeyboardAvoidingView>
        <Container light>
          <StatusBar translucent={false} />
          <Header transparent>
            <Left>
              <Button onPress={this.goBack} dark transparent>
                <Icon
                  style={GS.headerIcon}
                  name="chevron-left"
                  type="Feather"
                />
              </Button>
            </Left>
            <Body style={[GS.alignItemsStretch, { flex: 6 }]}>
              {this.state.showTitleOnHeader ? (
                <Title start>{this.title}</Title>
              ) : null}
            </Body>
          </Header>
          <ScrollView
            onScroll={this.onScroll}
            contentContainerStyle={GS.flexGrow1}
            stickyHeaderIndices={[1]}
          >
            <View
              onLayout={this.titleHeightChange}
              style={[GS.px3, GS.py3]}
              bg1
            >
              <H2>{this.title}</H2>
            </View>
            <FooterTab headerTab dir>
              {tabs.map(tab => {
                if (
                  (card &&
                    !card.setting.commentsOnCard &&
                    tab.tab === CardTabs.Comments) ||
                  (card &&
                    !card.setting.attachmentOnCard &&
                    tab.tab === CardTabs.Attachments)
                ) {
                  return null;
                }
                return (
                  <Button
                    key={tab.title}
                    onPress={() => this.changeTab(tab.tab)}
                    active={this.state.openTab === tab.tab}
                  >
                    <Text>{I18n.t(tab.title)}</Text>
                  </Button>
                );
              })}
            </FooterTab>
            <View style={GS.flex1} bg2>
              {(() => {
                switch (this.state.openTab) {
                  case CardTabs.Properties:
                    return (
                      <CardPropertiesTab
                        card={card}
                        navigation={this.props.navigation}
                        id={this.id} />
                    );
                  case CardTabs.Comments:
                    return <CardCommentsTab id={this.id} />;
                  case CardTabs.Activities:
                    return <CardActivitiesTab id={this.id} />;
                  case CardTabs.Attachments:
                    return (
                      <CardAttachmentsTab
                        id={this.id}
                        navigation={this.props.navigation}
                      />
                    );
                }
              })()}
            </View>
          </ScrollView>
          {this.state.openTab === CardTabs.Comments ? (
            <View bg1 style={GS.iphoneXBottom}>
              <Item style={GS.alignItemsEnd} noBorder>
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
          ) : null}
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.card
});

const mapDispatchToProps = dispatch => ({
  remove: id => {
    dispatch({
      type: ActionNames.CardDetailRemove,
      payload: id
    });
  },
  refresh: (id, skip) => CardService.fetch(dispatch, id, skip),
  toggleRefresh: status =>
    dispatch({
      type: ActionNames.CardDetailRefresh,
      payload: { id, status }
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);
