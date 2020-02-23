import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  mainContainer: {
    position: "relative"
  },
  // container: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   overflow: "hidden",
  //   backgroundColor: "#bdbdbd",
  //   position: "relative",
  //   width: 56,
  //   height: 56,
  //   borderRadius: 28
  // },
  // extraSmall: {
  //   width: 32,
  //   height: 32,
  //   borderRadius: 16
  // },
  // small: {
  //   width: 44,
  //   height: 44,
  //   borderRadius: 22
  // },
  // large: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50
  // },
  // square: {
  //   borderRadius: 0
  // },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  text: {
    textTransform: "uppercase"
  },
  icon: {
    color: "#fff",
    fontSize: 30
  },
  editBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  editBtnIcon: {
    marginLeft: 0,
    marginRight: 0
  },
  status: {
    position: "absolute",
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Styles;
