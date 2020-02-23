// @flow

import variable from "../../variables/platform-light";

export default (variables /* : * */ = variable) => {
  const customThumbnailTheme = {
    backgroundColor: variables.thumbnailBackground,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    color: variables.textColor,
    '.square': {
      borderRadius: 0
    },

    '.extraSmall': {
      width: 32,
      height: 32,
      borderRadius: 16
    },
    '.small': {
      width: 44,
      height: 44,
      borderRadius: 22
    },
    '.large': {
      width: 100,
      height: 100,
      borderRadius: 50
    },

  };

  return customThumbnailTheme;
};
