// @flow

import { Platform } from 'react-native';

import variable from './../variables/platform-light';
import { PLATFORM } from './../variables/commonColor';
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const titleTheme = {
    fontSize: variables.titleFontSize,
    fontFamily: variables.titleFontFamily,
    color: variables.titleFontColor,
    fontWeight: Platform.OS === PLATFORM.IOS ? '700' : undefined,
    textAlign: 'center',
    paddingLeft: Platform.OS === PLATFORM.IOS ? 4 : 0,
    marginLeft: Platform.OS === PLATFORM.IOS ? undefined : -3,
    paddingTop: 1,
    '.start': {
      textAlign: I18n.isRtl ? 'right' : 'left',
    }
  };

  return titleTheme;
};
