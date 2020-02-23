// @flow

import variable from './../variables/platform-light';
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
    fontFamily: variables.fontFamily,
    textAlign: I18n.isRtl ? 'right' : 'left',
  };

  return h1Theme;
};
