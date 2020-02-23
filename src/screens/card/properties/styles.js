import { StyleSheet } from "react-native";
import { Metrics } from "../../../themes/variables";

const { rem } = Metrics;
export default StyleSheet.create({
  label: {
    margin: 0.25 * rem,
    paddingHorizontal: 0.5 * rem,
    borderRadius: 0.25 * rem,
    minWidth: 2 * rem
  },
  labelText: {
    color: "#fff"
  }
});
