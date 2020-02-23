import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { connect, Provider } from "react-redux";
import AllReducers from "./reducers";
import AppNavigator from "./navigations";
import { StyleProvider, Button, Text, Container } from "native-base";
import getTheme from "../native-base-theme/components";
import LightPlatformUI from "../native-base-theme/variables/platform-light";
import DarkPlatformUI from "../native-base-theme/variables/platform-dark";
import { UIManager, Platform } from "react-native";
import { clearThemeCache } from "native-base-shoutem-theme";
import AlertComponent from "./components/elements/alert";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class AppComponent extends Component {
  render() {
    return (
      <Provider
        store={createStore(AllReducers, {}, applyMiddleware(ReduxThunk))}
      >
        <AppInner />
      </Provider>
    );
  }
}

class App extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.dataSource.dark !== prevProps.dataSource.dark) {
      clearThemeCache();
    }
  }
  render() {
    return (
      <StyleProvider
        style={getTheme(
          this.props.dataSource.dark ? DarkPlatformUI : LightPlatformUI
        )}
      >
        <>
          <AppNavigator />
          <AlertComponent />
        </>
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.app
});
const AppInner = connect(mapStateToProps)(App);
