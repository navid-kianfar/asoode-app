// @flow

import variable from './../variables/platform-light';
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize,
    lineHeight: 24,
    fontFamily: variables.fontFamily,
    textAlign: I18n.isRtl ? 'right' : 'left',
  };

  return inputTheme;
};
