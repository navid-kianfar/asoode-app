import { StyleSheet } from "react-native";
import I18n from "../../i18n";
import { Metrics } from "../../themes/variables";
const { rem } = Metrics;
const flexRow = I18n.isRtl ? "row-reverse" : "row";
const styles = StyleSheet.create({
  boxProgress: {
    height: 0.4 * rem,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: flexRow
  },
  boxProgressInner: {
    width: 0,
    height: "100%"
  },
  boardFooter: {
    flexDirection: flexRow,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingTop: 0.7 * rem,
    marginTop: 0.7 * rem
  }
});
export default styles;
