import { StyleSheet } from "react-native";
import { Metrics } from "../../themes/variables";
import I18n from "../../i18n";
const { rem } = Metrics;
const flexRow = I18n.isRtl ? "row-reverse" : "row";
const styles = StyleSheet.create({
  boardFooter: {
    flexDirection: flexRow,
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 0.7 * rem,
    marginTop: 0.7 * rem
  }
});
export default styles;
