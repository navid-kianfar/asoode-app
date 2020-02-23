// @flow

import variable from "../../variables/platform-light";
import I18n from "../../../src/i18n";

export default (variables /* : * */ = variable) => {
  const boardListCardTheme = {
    container: {
      backgroundColor: variables.listCardBg,
      padding: 10,
      // marginBottom: 10,
    },
    footer: {
      borderTopWidth: 1,
      paddingTop: 10,
      marginTop: 10,
      flexDirection: I18n.isRtl ? "row-reverse" : "row",
      borderColor: variables.cardBorderColor,
      flexWrap: 'wrap'
    },
    footerBadge: {
      flexDirection: I18n.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginVertical: 2,
      marginHorizontal: 5,
    }
  };

  return boardListCardTheme;
};
