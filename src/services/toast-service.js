import { Platform } from "react-native";
import Toast from "react-native-toast-native";
import I18n from "../i18n";
const shared = {
  width: 300,
  height: Platform.OS === "ios" ? 50 : 100,
  fontSize: 15,
  lineHeight: 2,
  lines: 4,
  borderRadius: 15,
  fontWeight: "bold",
  yOffset: 40
};

class ToastService {
  Toast = Toast;
  success(message: string, position = Toast.TOP) {
    Toast.show(I18n.t(message), Toast.SHORT, position, {
      backgroundColor: "#079b1d",
      color: "#ffffff",
      ...shared
    });
  }
  error(message: string, position = Toast.TOP) {
    Toast.show(I18n.t(message), Toast.SHORT, position, {
      backgroundColor: "#fb2d2a",
      color: "#ffffff",
      ...shared
    });
  }
  warning(message: string, position = Toast.TOP) {
    Toast.show(I18n.t(message), Toast.SHORT, position, {
      backgroundColor: "#fbdc22",
      color: "#000000",
      ...shared
    });
  }
  info(message: string, position = Toast.TOP) {
    Toast.show(I18n.t(message), Toast.SHORT, position, {
      backgroundColor: "#006efb",
      color: "#ffffff",
      ...shared
    });
  }
}
const instance = new ToastService();
export default instance;
