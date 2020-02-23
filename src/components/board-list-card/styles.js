import { StyleSheet } from "react-native";
import { Metrics } from "../../themes/variables";
const rem = Metrics.rem;

const styles = StyleSheet.create({
  coverImage: {
    height: 150,
    width: "100%"
  },
  coverImageContainer: {
    marginTop: -10,
    marginHorizontal: -10,
    marginBottom: 10
  },
  label: {
    margin: 0.25 * rem,
    paddingHorizontal: 0.5 * rem,
    borderRadius: 0.25 * rem,
    minWidth: 3 * rem,
    minHeight: 0.5 * rem
  },
  labelText: {
    color: "#fff"
  },
  memberItem: {
    margin: 2
  },
  cardFooter: {
    borderTopWidth: 1,
    paddingTop: 0.7 * rem,
    marginTop: 0.7 * rem
  }
});

export default styles;
