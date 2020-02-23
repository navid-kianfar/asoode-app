// @flow

import { Platform } from 'react-native';

import variable from './../variables/platform-light';
import { PLATFORM } from './../variables/commonColor';
import I18n from "../../src/i18n";

export default (variables /* : * */ = variable) => {
  const platform = variables.platform;

  const footerTabTheme = {
    'NativeBase.Button': {
      '.active': {
        'NativeBase.Text': {
          color: variables.tabBarActiveTextColor,
          // fontSize: variables.tabBarTextSize,
          fontSize: variables.fontSizeBase,
          lineHeight: 16
        },
        'NativeBase.Icon': {
          color: variables.tabBarActiveTextColor
        },
        'NativeBase.IconNB': {
          color: variables.tabBarActiveTextColor
        },
        borderColor: variables.tabActiveBgColor,
        borderTopWidth: 2,
      },
      flexDirection: null,
      backgroundColor: 'transparent',
      borderColor: null,
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
      alignSelf: 'flex-start',
      flex: 1,
      height: variables.footerHeight,
      justifyContent: 'center',
      '.badge': {
        'NativeBase.Badge': {
          'NativeBase.Text': {
            fontSize: 11,
            fontWeight: platform === PLATFORM.IOS ? '600' : undefined,
            lineHeight: 14
          },
          top: -3,
          alignSelf: 'center',
          left: 10,
          zIndex: 99,
          height: 18,
          padding: 1.7,
          paddingHorizontal: 3,
        },
        'NativeBase.Icon': {
          marginTop: -18
        }
      },
      'NativeBase.Icon': {
        color: variables.tabBarTextColor,
        fontSize: 30,
      },
      'NativeBase.IconNB': {
        color: variables.tabBarTextColor
      },
      'NativeBase.Text': {
        color: variables.tabBarTextColor,
        // fontSize: variables.tabBarTextSize,
        fontSize: variables.fontSizeBase,
        lineHeight: 16
      }
    },
    '.headerTab': {
      backgroundColor: variables.toolbarDefaultBg,
      'NativeBase.Button': {
        '.active': {
          'NativeBase.Text': {
            fontSize: variables.fontSizeBase,
            lineHeight: variables.fontSizeBase * 1.5,
          },
          borderTopWidth: 0,
          borderBottomWidth: 2,
        },
        'NativeBase.Text': {
          fontSize: variables.fontSizeBase,
          lineHeight: variables.fontSizeBase * 1.5,
          paddingHorizontal: 0,
        }
      }
    },
    '.dir': {
      flexDirection: I18n.isRtl ? 'row-reverse' : 'row',
    },
    backgroundColor:
      Platform.OS === PLATFORM.ANDROID ? variables.footerDefaultBg : undefined,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignSelf: 'stretch'
  };

  return footerTabTheme;
};
