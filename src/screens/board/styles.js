import { StyleSheet, StatusBar } from "react-native";
import variables from "../../../native-base-theme/variables/platform-light";
import { Metrics } from "../../themes/variables";

const styles = StyleSheet.create({
  wrapperElement: {
    paddingTop: variables.toolbarHeight + (StatusBar.currentHeight || 20),
    flex: 1,
    zIndex: -3
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0
  },
  headerButton: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 7
  },
  listContainer: {
    flex: 1,
    width: Metrics.WIDTH,
    paddingHorizontal: 20
  }
});

export default styles;
