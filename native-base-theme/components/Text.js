// @flow

import variable from './../variables/platform-light';
import I18n from '../../src/i18n';

export default (variables /* : * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    textAlign: I18n.isRtl ? 'right' : 'left',
    '.input': {
      alignItems: 'center',
      color: variables.inputColor,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: variables.inputFontSize,
      lineHeight: 24,
    },
    '.bold': {
      fontFamily: variables.boldFontFamily
    },
    '.light': {
      fontFamily: variables.lightFontFamily
    },
    '.note': {
      color: variables.noteColor,
      fontSize: variables.noteFontSize
    },
    '.mute': {
      color: variables.noteColor,
    },
    '.primary': {
      color: variables.brandPrimary,
    },
    '.danger': {
      color: variables.brandDanger,
    },
    '.center': {
      textAlign: 'center'
    },
    '.small': {
      fontSize: variables.noteFontSize
    }
  };

  return textTheme;
};
