import React, { Component } from "react";
import {
  Container,
  View,
  Button,
  Text,
  Icon,
  Left,
  ListItem,
  Body
} from "native-base";
import I18n from "../../../i18n";
import { connect } from "react-redux";
import ActionNames from "../../../reducers/action-names";
import GS from "../../../themes/general-styles";
import SimpleHeaderComponent from "../../../components/simple-header";
import Thumbnail from "../../../components/elements/thumbnail";
import Moment from "react-moment";
import EmptyPageComponent from "../../../components/empty-page";
import LazyLoadFlatList from "../../../components/elements/lazy-load";

const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
class SupportScreen extends Component {
  componentDidMount() {}
  openAddModal = () => {
    this.props.navigation.navigate("CreateTicketModal");
  };
  goToChat = item => {
    this.props.navigation.navigate("SupportChat", item);
  };
  renderItem = ({ item }) => {
    return (
      <ListItem onPress={() => this.goToChat(item)} avatar dir>
        <Left>
          <Thumbnail small icon={{ name: "headset" }} />
        </Left>
        <Body style={GS.me2}>
          <View style={[GS.flexRowDir]}>
            <View style={[GS.flexGrow1, GS.flexShrink1]}>
              <Text numberOfLines={1} style={GS.textEllipsis}>
                {item.title}
              </Text>
            </View>
            <View style={GS.ps3}>
              <Moment locale="fa" element={MomentText} local fromNow>
                {item.createdAt}
              </Moment>
            </View>
          </View>
          <Text numberOfLines={1} note>
            {item.description}
          </Text>
        </Body>
      </ListItem>
    );
  };
  renderEmpty = () => {
    return (
      <EmptyPageComponent
        image={require("../../../assets/images/no-messages.png")}
        imageHeightRatio={0.8}
        header={I18n.t("NO_SUPPORT")}
        description={I18n.t("NO_SUPPORT_DESCRIPTION")}
        buttonText={I18n.t("START_SUPPORT")}
        handler={this.openAddModal}
      />
    );
  };
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("SUPPORT")}
          rightInnerComponent={
            <Button onPress={this.openAddModal} dark transparent>
              <Icon style={GS.headerIcon} name="pluscircleo" type="AntDesign" />
            </Button>
          }
        />
        <LazyLoadFlatList
          backend="/user/supports/filter"
          flatListProps={{
            style: GS.zIndexM,
            contentContainerStyle: [GS.flexGrow1],
            ListEmptyComponent: this.renderEmpty,
            renderItem: this.renderItem,
            keyExtractor: (_, i) => `${i}`
          }}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.support
});
const mapDispatchToProps = dispatch => ({
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.SupportRefresh,
      payload: status
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen);
