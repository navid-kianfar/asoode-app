import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Body, Title, Header, Left, Right, Icon, Button } from "native-base";
import Styles from "./styles";
import PropTypes from "prop-types";
import Thumbnail from "../elements/thumbnail";
import { connect } from "react-redux";
import GS from "../../themes/general-styles";

class MainHeaderComponent extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    title: PropTypes.string,
    chatHeader: PropTypes.bool
  };
  goToSearch = () => this.props.navigation.navigate("SearchScreen");
  goToProfile = () => this.props.navigation.navigate("ProfileStack");
  goToCreate = () => this.props.navigation.navigate("CreationScreen");
  goToNotifications = () =>
    this.props.navigation.navigate("NotificationsStack");
  render() {
    return (
      <Header>
        <Left>
          {this.props.chatHeader ? (
            <Button onPress={this.props.navigation.openDrawer} dark transparent>
              <Icon style={GS.headerIcon} name="menu" type="SimpleLineIcons" />
            </Button>
          ) : (
            <>
              <Button onPress={this.goToCreate} dark transparent>
                <Icon
                  style={GS.headerIcon}
                  name="pluscircleo"
                  type="AntDesign"
                />
              </Button>
              <Button style={GS.me2} onPress={this.goToSearch} dark transparent>
                <Icon style={GS.headerIcon} name="search1" type="AntDesign" />
              </Button>
            </>
          )}
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          {!this.props.chatHeader ? (
            <Button
              style={GS.ms1}
              onPress={this.goToNotifications}
              dark
              transparent
            >
              <Icon style={GS.headerIcon} name="bells" type="AntDesign" />
            </Button>
          ) : null}
          <Thumbnail
            contentContainerStyle={GS.headerIcon}
            extraSmall
            onPress={this.goToProfile}
            source={this.props.dataSource.profile?.avatar}
            title={this.props.dataSource.profile?.initials}
            waiting={this.props.dataSource.waiting}
          />
        </Right>
      </Header>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.auth
});
export default connect(mapStateToProps, null)(MainHeaderComponent);
