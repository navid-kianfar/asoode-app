import { StyleSheet } from "react-native";
import { Metrics } from "../../themes/variables";
const { rem } = Metrics;
const styles = StyleSheet.create({
  contentInner: {
    paddingVertical: rem
  },
  calendarHeader: {
    justifyContent: "space-between",
    paddingHorizontal: 0.7 * rem,
    paddingVertical: 0.2 * rem,
    alignItems: "center"
  },
  sectionHeaderTextWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#555",
    alignItems: "center"
  },
  sectionHeaderIcon: {
    fontSize: 20
  },
  sectionHeaderText: {
    fontSize: 20
  },
  sectionHeaderTextBold: {
    fontSize: 20
    // fontWeight: "500"
  }
});
export default styles;
