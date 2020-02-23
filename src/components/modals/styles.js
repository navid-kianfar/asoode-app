import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  header: {
    flexDirection: "row",
    // paddingVertical: 5,
    alignItems: "center"
  },
  headerTitle: {
    textAlign: "center",
    width: "100%"
  },
  doneText: {
    fontWeight: "400",
    fontSize: 18
  },
  pickerContainer: {
    height: 380,
    justifyContent: "center"
  },
  image: {
    width: 30,
    height: 30
  },
  icon: {
    fontSize: 30
  }
});

export default styles;
