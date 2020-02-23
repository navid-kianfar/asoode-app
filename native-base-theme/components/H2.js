// @flow

import variable from './../variables/platform-light';
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const h2Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH2,
    lineHeight: variables.lineHeightH2,
    fontFamily: variables.fontFamily,
    textAlign: I18n.isRtl ? 'right' : 'left',
  };

  return h2Theme;
};
