// @flow

import variable from './../variables/platform-light';
import { PLATFORM } from './../variables/commonColor';
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const badgeCommon = {
    'NativeBase.Text': {
      color: variables.badgeColor,
    },
    'NativeBase.Icon': {
      color: variables.badgeColor,
    },
  };
  const badgeTheme = {
    '.primary': {
      ...badgeCommon,
      backgroundColor: variables.buttonPrimaryBg
    },
    '.warning': {
      ...badgeCommon,
      backgroundColor: variables.buttonWarningBg
    },
    '.info': {
      ...badgeCommon,
      backgroundColor: variables.buttonInfoBg
    },
    '.success': {
      ...badgeCommon,
      backgroundColor: variables.buttonSuccessBg
    },
    '.danger': {
      ...badgeCommon,
      backgroundColor: variables.buttonDangerBg
    },
    'NativeBase.Text': {
      fontSize: variables.fontSizeBase,
      lineHeight: variables.lineHeight - 1,
      textAlign: 'center',
      paddingHorizontal: 3
    },
    'NativeBase.Icon': {
      fontSize: variables.fontSizeBase,
      lineHeight: variables.lineHeight - 1,
      textAlign: 'center',
      paddingHorizontal: 3
    },
    backgroundColor: variables.badgeBg,
    flexDirection: I18n.isRtl ? "row-reverse" : "row",
    padding: variables.badgePadding,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
    alignItems: 'center',
    // justifyContent: variables.platform === PLATFORM.IOS ? 'center' : undefined,
    borderRadius: 13.5,
    height: 27
  };
  return badgeTheme;
};
