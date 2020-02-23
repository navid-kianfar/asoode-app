// @flow

import I18n from "../../src/i18n";

export default () => {
  const bodyTheme = {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    '.row': {
      flexDirection: I18n.isRtl ? "row-reverse" : "row"
    }
  };

  return bodyTheme;
};
