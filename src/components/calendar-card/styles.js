import { StyleSheet } from "react-native";
import I18n from "../../i18n";
import { Metrics } from "../../themes/variables";
const { rem } = Metrics;
const flexRow = I18n.isRtl ? "row-reverse" : "row";
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
