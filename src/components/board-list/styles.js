import { StyleSheet } from "react-native";
import { Metrics } from "../../themes/variables";
import GS from "../../themes/general-styles";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: Metrics.WIDTH,
    paddingHorizontal: 20
  },
  list: {
    flex: 1
  },
  listContent: {
    borderRadius: 3
  },
  listHeader: {
    padding: 10,
    borderRadius: 3
  },
  listName: {
    flex: 1,
    paddingVertical: 0,
    maxHeight: 140
  }
});

export default styles;
