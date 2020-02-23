// @flow

import variable from './../variables/platform-light';
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const h3Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH3,
    lineHeight: variables.lineHeightH3,
    fontFamily: variables.fontFamily,
    textAlign: I18n.isRtl ? 'right' : 'left',
  };

  return h3Theme;
};
