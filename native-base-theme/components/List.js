// @flow

import { Platform, PixelRatio } from 'react-native';

import pickerTheme from './Picker';
import variable from './../variables/platform-light';
import I18n from 'i18n-js';
import { PLATFORM } from './../variables/commonColor';

export default (variables /* : * */ = variable) => {
  const listTheme = {
    backgroundColor: variables.listContainer,
    '.transparent': {
      backgroundColor: null,
    }
  };

  return listTheme;
};
