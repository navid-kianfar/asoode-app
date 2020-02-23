import React, { Component } from "react";
import { FlatList, ActivityIndicator, Image } from "react-native";
import { Container, ListItem, Left, Body, View, Icon, Text } from "native-base";
import TeamService from "../../services/team-service";
import { connect } from "react-redux";
import GS from "../../themes/general-styles";
import I18n from "../../i18n";
import Thumbnail from "../../components/elements/thumbnail";
import MainHeaderComponent from "../../components/main-header";
import Styles from "./styles";
import Svg from "../../components/elements/svg";

const images = {
  backgroundDark: require("../../assets/images/notification-devices-dark.png"),
  backgroundLight: require("../../assets/images/notification-devices-light.png")
};
class TimeSpentListScreen extends Component {
  componentDidMount() {
    if (!this.props.dataSource.teams.length) {
      this.props.refresh();
    }
  }
  renderHeader = () => {
    return (
      <View style={[GS.alignItemsCenter, GS.py5]}>
        <Svg name="stopwatch" size={100} mute />
      </View>
    );
  };
  renderItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={() => this.props.navigation.navigate("TimeSpentScreen", item)}
        first={index === 0}
        last={index === this.props.dataSource.teams}
        hasBackground
        avatar
        dir
      >
        <Left>
          <Thumbnail
            small
            source={item.logo}
            fallback={require("../../assets/images/anyteam-mini.png")}
          />
        </Left>
        <Body>
          <Text>{item.title}</Text>
        </Body>
      </ListItem>
    );
  };
  render() {
    const data = [
      {
        title: I18n.t("MY_TIME_SPENTS")
      },
      ...this.props.dataSource.teams
    ];
    return (
      <Container>
        <MainHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("TIME_SPENT")}
        />
        {this.props.dataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={(item, index) => item.title + index}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.team
});

const mapDispatchToProps = dispatch => ({
  refresh: skip => TeamService.fetch(dispatch, skip)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeSpentListScreen);
