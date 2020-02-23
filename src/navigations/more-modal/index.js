import React, { Component } from "react";
import { Animated, SafeAreaView, TouchableOpacity } from "react-native";
import { View, List, ListItem, Text, Left, Body } from "native-base";
import PropTypes from "prop-types";
import Styles from "./styles";
import Svg from "../../components/elements/svg";
import I18n from "../../i18n";
import { Colors } from "../../themes/variables";
const { func, bool, any } = PropTypes;

export default class MoreModalScreen extends Component {
  static propTypes = {
    close: func,
    open: bool,
    navigation: any
  };
  state = {
    open: this.props.open,
    animation: new Animated.Value(0),
    closed: true,
    options: [
      {
        route: "FileManager",
        name: I18n.t("FILE_MANAGER"),
        icon: "files"
      },
      {
        route: "TimeSpentList",
        name: I18n.t("TIME_SPENT"),
        icon: "time-spent"
      }
      // {
      //   route: "Automation",
      //   name: I18n.t("AUTOMATION"),
      //   icon: "automation"
      // },
      // {
      //   route: "ContactsList",
      //   name: I18n.t("CONTACT"),
      //   icon: "contact-card"
      // },
    ]
  };
  canToggle = true;
  plateStyles = {
    transform: [
      {
        translateY: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0]
        })
      }
    ]
  };
  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.canToggle = false;
      if (this.props.open) {
        this.setState({ closed: false });
      }
      const value = this.props.open ? 1 : 0;
      Animated.timing(this.state.animation, {
        toValue: value,
        duration: 200,
        useNativeDriver: true
      }).start();
      setTimeout(() => {
        this.canToggle = true;
        if (!this.props.open) {
          this.setState({ closed: true });
        }
      }, 200);
    }
  }
  close = () => {
    if (this.canToggle) {
      this.props.close();
    }
  };
  navigate = route => {
    this.props.navigation.navigate(route);
    this.close();
  };

  render() {
    if (this.state.closed) {
      return null;
    }
    return (
      <SafeAreaView style={Styles.SafeArea}>
        <Animated.View
          style={[Styles.container, { opacity: this.state.animation }]}
        >
          <TouchableOpacity
            onPress={this.close}
            style={Styles.TouchableContainer}
            activeOpacity={1}
          >
            <Animated.View style={this.plateStyles}>
              <View style={Styles.plate}>
                <List>
                  {this.state.options.map((option, i) => {
                    const state = this.props.navigation.state;
                    const active =
                      state.index ===
                      state.routes.findIndex(r => r.routeName === option.route);
                    return (
                      <ListItem
                        onPress={() => this.navigate(option.route)}
                        selected={active}
                        key={i}
                        icon
                        dir
                      >
                        <Left>
                          <Svg
                            name={option.icon}
                            color={active ? Colors.primary : null}
                          />
                        </Left>
                        <Body>
                          <Text>{option.name}</Text>
                        </Body>
                      </ListItem>
                    );
                  })}
                </List>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
}
