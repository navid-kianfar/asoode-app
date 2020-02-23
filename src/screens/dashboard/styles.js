import { StyleSheet } from "react-native";
import { Metrics } from "../../themes/variables";
const { rem } = Metrics;
const styles = StyleSheet.create({
  contentInner: {
    paddingVertical: rem
  },
  sectionHeaderText: {
    paddingHorizontal: 0.7 * rem,
    paddingVertical: 0.2 * rem
  },
  chartSection: {
    // flexDirection: 'row',
    width: "100%"
  },
  chartInfo: {
    flexGrow: 1,
    justifyContent: "center"
  },
  chartWrapper: {
    marginLeft: -1.4 * rem
  },
  chart: {
    flex: 1,
    width: "100%",
    paddingTop: "21.6666667%"
  }
});
export default styles;
