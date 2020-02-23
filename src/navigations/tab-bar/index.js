import React, { Component } from "react";
import { Keyboard } from "react-native";
import { Footer, FooterTab, Button, Badge, Text } from "native-base";
import Svg from "../../components/elements/svg";
import MoreModalScreen from "../more-modal";
import { Colors } from "../../themes/variables";

export default class TabBarComponent extends Component {
  state = {
    moreModalOpen: false,
    buttons: [
      {
        name: "Dashboard",
        icon: "dashboard"
      },
      {
        name: "Calendar",
        icon: "calendar"
      },
      {
        name: "Chat",
        icon: "chat-bubble",
        badge: 2
      },
      {
        name: "Teams",
        icon: "users"
      },
      {
        name: "More",
        icon: "more"
      }
    ],
    keyboardOpen: false
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this.setState({ keyboardOpen: true })
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this.setState({ keyboardOpen: false })
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  render() {
    if (this.state.keyboardOpen) {
      return null;
    }
    return (
      <>
        <Footer>
          <FooterTab>
            {this.state.buttons.map((b, i) => {
              const state = this.props.navigation.state;
              const active =
                b.name === "More"
                  ? state.index >= 4
                  : state.index ===
                    state.routes.findIndex(r => r.routeName === b.name);
              return (
                <Button
                  onPress={() => this.navigate(b.name)}
                  active={active}
                  key={i}
                  badge={!!b.badge}
                >
                  {b.badge ? (
                    <Badge danger>
                      <Text>{b.badge}</Text>
                    </Badge>
                  ) : null}
                  <Svg
                    // color={active ? Colors.primary : Colors.footerText}
                    wrapperStyle={b.badge ? { marginTop: -18 } : null}
                    name={b.icon}
                  />
                </Button>
              );
            })}
          </FooterTab>
        </Footer>
        <MoreModalScreen
          open={this.state.moreModalOpen}
          close={this.toggleMoreModal}
          navigation={this.props.navigation}
        />
      </>
    );
  }
  navigate(routeName) {
    if (routeName === "More") {
      this.toggleMoreModal();
      return;
    }
    if (this.state.moreModalOpen) {
      this.setState({ moreModalOpen: false });
    }
    if (this.state.routeName !== routeName) {
      this.props.navigation.navigate(routeName);
    }
  }
  toggleMoreModal = () => {
    this.setState({ moreModalOpen: !this.state.moreModalOpen });
  };
}
