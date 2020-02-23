// @flow

import I18n from "../../src/i18n";
import variable from "../variables/platform-light";

export default (variables /* : * */ = variable) => {
  const labelTheme = {
    '.focused': {
      width: 0
    },
    color: variables.textColor,
    fontFamily: variables.fontFamily,
    fontSize: 17,
    lineHeight: 25,
    textAlign: I18n.isRtl ? 'right' : 'left',
  };

  return labelTheme;
};
