import { StyleSheet } from "react-native";
import { Metrics } from "../../themes/variables";

const styles = StyleSheet.create({
  image: {
    width: Metrics.WIDTH * 0.8,
    height: Metrics.WIDTH * 0.7,
    alignSelf: "center"
  },
  formContainer: {
    marginTop: -Metrics.WIDTH * 0.15,
    paddingVertical: 15
  },
  templateList: {
    marginHorizontal: -0.5 * Metrics.rem
  },
  backgroundCard: {
    height: 100,
    width: "100%",
    borderRadius: 5,
    overflow: "hidden"
  },
  checked: {
    backgroundColor: "#0005",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
