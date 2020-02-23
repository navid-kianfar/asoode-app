import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight || 20,
    height: 44 + (StatusBar.currentHeight || 20)
  },
  labelIcon: {
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});

export default styles;
