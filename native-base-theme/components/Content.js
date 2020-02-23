// @flow

import variable from "../variables/platform-light";

export default (variables /* : * */ = variable) => {
  const contentTheme = {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: -1,
    'NativeBase.Segment': {
      borderWidth: 0,
      backgroundColor: 'transparent'
    },
    '.background': {
      backgroundColor: variables.containerBgColor
    }
  };

  return contentTheme;
};
