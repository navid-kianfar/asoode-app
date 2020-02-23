import { StyleSheet } from "react-native";
import { Metrics } from "../../../themes/variables";
const { rem } = Metrics;

const styles = StyleSheet.create({
  timeContainer: {
    width: 4.5 * rem,
    paddingHorizontal: 0.4 * rem
  },
  calendarCardBody: {
    borderRightWidth: 3
  }
});

export default styles;
