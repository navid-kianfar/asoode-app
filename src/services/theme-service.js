import AsyncStorage from "@react-native-community/async-storage";
import Constants from "../library/constants";
import ActionNames from "../reducers/action-names";
import RNRestart from "react-native-restart";

class ThemeService {
  action(status, dispatch) {
    dispatch({
      type: ActionNames.ChangeTheme,
      payload: status
    });
  }
  async load(dispatch) {
    const dark = await AsyncStorage.getItem(Constants.APP_THEME);
    if (dark !== undefined) {
      this.action(dark === "1", dispatch);
    } else {
      await this.change(false, dispatch);
    }
  }
  async change(status, dispatch) {
    // this.action(status, dispatch);
    await AsyncStorage.setItem(Constants.APP_THEME, status ? "1" : "0");
    RNRestart.Restart();
  }
}
const instance = new ThemeService();
export default instance;
