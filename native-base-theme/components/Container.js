// @flow

import { Platform, Dimensions } from 'react-native';

import variable from './../variables/platform-light';
import { PLATFORM } from './../variables/commonColor';

const deviceHeight = Dimensions.get('window').height;
export default (variables /* : * */ = variable) => {
  const theme = {
    '.light': {
      backgroundColor: variables.containerLighterBgColor
    },
    flex: 1,
    height: Platform.OS === PLATFORM.IOS ? deviceHeight : deviceHeight - 20,
    backgroundColor: variables.containerBgColor
  };

  return theme;
};
