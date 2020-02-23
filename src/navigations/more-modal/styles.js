import { StyleSheet } from "react-native";
import Platform from "../../../native-base-theme/variables/platform-light";

const Styles = StyleSheet.create({
  SafeArea: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: Platform.isIphoneX ? 88 : 55
  },
  container: {
    flex: 1
  },
  TouchableContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.2)",
    justifyContent: "flex-end"
  },
  plate: {
    width: "100%"
  }
});

export default Styles;
