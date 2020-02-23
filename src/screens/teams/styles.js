import { StyleSheet } from "react-native";
import { Metrics } from "../../themes/variables";
const { rem } = Metrics;

const Styles = StyleSheet.create({
  contentInner: {
    paddingVertical: rem
  },
  sectionHeaderText: {
    paddingHorizontal: 0.7 * rem,
    paddingVertical: 0.2 * rem
  }
});

export default Styles;
