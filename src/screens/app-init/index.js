import React, { Component } from "react";
import { View, Image, StatusBar, Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import IdentityService from "../../services/identity-service";
import SocketService from "../../services/socket-service";
import ThemeService from "../../services/theme-service";
import BoardService from "../../services/board-service";
import { connect } from "react-redux";

class AppInit extends Component {
  images = {
    logo: {
      primary: require("../../assets/images/anyteam-mini.png")
    }
  };

  async fetch() {
    const profile = IdentityService.profile(this.props.dispatch);
    const colors = BoardService.colors(this.props.dispatch);
    const pictures = BoardService.pictures(this.props.dispatch);
    const boards = BoardService.fetch(this.props.dispatch);
    return Promise.all([profile, colors, pictures, boards]);
  }
  componentDidMount() {
    this.clear(false).then(() => {
      ThemeService.load(this.props.dispatch).then(() => {
        IdentityService.restoreToken().then(auth => {
          if (!auth) {
            this.props.navigation.navigate("Auth");
            return;
          }
          SocketService.init(this.props.dispatch);
          this.fetch().then(() => {
            this.props.navigation.navigate("Main");
          });
        });
      });
    });
  }

  clear(status) {
    if (!status) return Promise.resolve();
    return AsyncStorage.clear();
  }

  render() {
    if (Platform.OS === "android") {
      return null;
    }
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff"
          }}
        >
          <Image source={this.images.logo.primary} />
        </View>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(AppInit);
