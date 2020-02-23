// @flow

import variable from "../../variables/platform-light";

export default (variables /* : * */ = variable) => {
  const boardListCardTheme = {
    backgroundStyles: {
      borderRadius: 5,
      backgroundColor: variables.defaultBoardBg,
      paddingHorizontal: 8
    },
    headerTitle: {
      color: variables.boardHeaderTitle,
      fontSize: 25,
      textShadowColor: "rgba(0, 0, 0, 0.5)",
      textShadowRadius: 5
    },
    listContainer: {
      alignItems: "flex-start",
      minHeight: 108,
      overflow: "hidden"
    },
    list: {
      backgroundColor: variables.boardListBg,
      padding: 4,
      paddingBottom: 12,
      borderRadius: 3,
      width: 42,
      margin: 4
    },
    card: {
      backgroundColor: variables.listCardBg,
      borderRadius: 2,
      height: 24,
      marginBottom: 4,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2
    }
  };

  return boardListCardTheme;
};
