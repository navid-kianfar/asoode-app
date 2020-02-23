// @flow

import variable from './../variables/platform-light';

export default (variables /* : * */ = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: variables.textColor,
    '.note': {
      color: variables.noteColor,
      fontSize: variables.noteFontSize
    },
    '.mute': {
      color: variables.noteColor
    },
    '.primary': {
      color: variables.brandPrimary,
    },
    '.danger': {
      color: variables.brandDanger,
    }
  };

  return iconTheme;
};
