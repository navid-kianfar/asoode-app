// @flow

import { Platform } from 'react-native';

import variable from './../variables/platform-light';
import { PLATFORM } from './../variables/commonColor';

export default (variables /* : * */ = variable) => {
  const subtitleTheme = {
    fontSize: variables.subTitleFontSize,
    fontFamily: variables.titleFontFamily,
    color: variables.subtitleColor,
    textAlign: 'center',
    paddingLeft: Platform.OS === PLATFORM.IOS ? 4 : 0,
    marginLeft: Platform.OS === PLATFORM.IOS ? undefined : -3
  };

  return subtitleTheme;
};
