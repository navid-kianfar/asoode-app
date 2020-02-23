// @flow

import variable from "../variables/platform-light";
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const pickerTheme = {
    '.note': {
      color: '#8F8E95'
    },
    // width: 90,
    // color: variables.textColor,
    // fontFamily: variables.fontFamily,
    // textAlign: I18n.isRtl ? 'right' : 'left',
    marginRight: -4,
    flexGrow: 1
  };

  return pickerTheme;
};
