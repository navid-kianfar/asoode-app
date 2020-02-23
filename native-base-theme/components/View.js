// @flow

import variable from './../variables/platform-light';
import itemTheme from './Item';
import {Platform} from "react-native";
import {PLATFORM} from "../variables/commonColor";
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding
    },
    '.bg1': { backgroundColor: variables.bg_1 },
    '.bg2': { backgroundColor: variables.bg_2 },
    '.bg3': { backgroundColor: variables.bg_3 },
    '.boardList': { backgroundColor: variables.boardListBg },
    flexDirection: 'column',
    borderColor: variables.cardBorderColor,
    '.item': {
      'NativeBase.Label': {
        fontSize: variables.inputFontSize,
        color: variables.inputColorPlaceholder,
        paddingRight: 5
      },
      'NativeBase.Icon': {
        fontSize: 24,
        paddingRight: 8,
        marginHorizontal: 8
      },
      'NativeBase.IconNB': {
        fontSize: 24,
        paddingRight: 8
      },
      'NativeBase.Input': {
        '.multiline': {
          height: null
        },
        height: variables.inputHeightBase,
        color: variables.inputColor,
        flex: 1,
        top: Platform.OS === PLATFORM.IOS ? 1.5 : undefined,
        fontSize: variables.inputFontSize
      },
      '.regular': {
        'NativeBase.Input': {
          paddingLeft: 8
        },
        'NativeBase.Icon': {
          paddingLeft: 10
        },
        '.success': {
          borderColor: variables.inputSuccessBorderColor
        },
        '.error': {
          borderColor: variables.inputErrorBorderColor
        },
        borderWidth: 0,
        backgroundColor: variables.inputBackgroundColor,
        borderRadius: variables.borderRadiusBase,
        // borderWidth: variables.borderWidth * 2,
        // borderColor: variables.inputBorderColor
      },
      minHeight: variables.inputHeightBase,
      borderWidth: variables.borderWidth * 2,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: variables.inputBorderColor,
      backgroundColor: 'transparent',
      flexDirection: I18n.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginLeft: 2
    },
    '.regularItem': {
      minHeight: variables.inputHeightBase,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: variables.inputBorderColor,
      flexDirection: I18n.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginLeft: 2,
      borderWidth: 0,
      backgroundColor: variables.inputBackgroundColor,
      borderRadius: variables.borderRadiusBase,
    },
  };

  return viewTheme;
};
