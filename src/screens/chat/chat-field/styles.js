import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../themes/variables";
const { rem } = Metrics;
const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: 0.5 * rem,
    paddingVertical: 0.2 * rem
  },
  yourChatItem: {
    flexDirection: "row-reverse"
  },
  messageBox: {
    flexShrink: 1,
    minWidth: 0,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 0.5 * rem,
    paddingHorizontal: rem,
    borderRadius: rem,
    paddingVertical: 0.3 * rem
  },
  yourMessageBox: {
    backgroundColor: Colors.primary
  },
  chatItemDate: {
    paddingVertical: 0.3 * rem
  },
  chatHeader: {
    flexDirection: "row"
  },
  yourChatHeader: {
    flexDirection: "row-reverse"
  },
  chatMessage: {
    color: "#222",
    flexShrink: 1
  },
  yourChatMessage: {
    color: "#fff"
  },
  chatName: {
    color: "#888",
    fontSize: 15
  },
  yourChatName: {
    color: "#eaeaea"
  },
  chatDate: {
    color: "#888",
    fontSize: 15
    // marginLeft: 10
  },
  yourChatDate: {
    // color: "#eaeaea",
    // marginRight: 10,
    // marginLeft: null,
  },
  fullMessageArea: {
    marginHorizontal: -rem * 0.85,
    marginVertical: -rem * 0.15,
    borderRadius: rem * 0.85,
    overflow: "hidden"
  },
  imageWrapper: {
    paddingTop: "100%"
  },
  sharedImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default styles;
