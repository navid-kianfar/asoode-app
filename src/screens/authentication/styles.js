import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  scrollable: {
    flexGrow: 1
  },
  content: {
    flex: 1,
    justifyContent: "flex-end"
  },
  backgroundImage: {
    opacity: 0.85
  },
  box: {
    marginTop: "auto",
    shadowColor: "#000",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    borderRadius: 5,
    margin: 10
  }
});
export default styles;
