// @flow

import variable from './../variables/platform-light';
import { Metrics } from "../../src/themes/variables";

export default (variables /* : * */ = variable) => {
  const cardTheme = {
    '.margined': {
      marginHorizontal: 0.5 * Metrics.rem,
    },
    '.transparent': {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null,
      backgroundColor: 'transparent',
      borderWidth: 0
    },
    '.noShadow': {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      elevation: null
    },
    '.noBorder': {
      borderWidth: 0,
    },
    '.curve': {
      borderRadius: variables.curveCardBorderRadius,
    },
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: variables.borderWidth,
    borderRadius: variables.cardBorderRadius,
    borderColor: variables.cardBorderColor,
    flexWrap: 'nowrap',
    backgroundColor: variables.cardDefaultBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3
  };

  return cardTheme;
};
