import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  pickerWrapper: {
    alignItems: "center"
  },
  picker: {
    width: 150,
    height: 180
  },
  pickerItem: {
    fontSize: 26
  },
  divider: {
    fontSize: 40,
    paddingTop: 30
  }
});

export default styles;
