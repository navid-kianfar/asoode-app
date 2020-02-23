// @flow

import variable from "../../variables/platform-light";

export default (variables /* : * */ = variable) => {
  const boardItemTheme = {
    progressColor: variables.cardBorderColor,
    footerBorderColor: variables.cardBorderColor,
    color: variables.inputTextColor,
  };

  return boardItemTheme;
};
