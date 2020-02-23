// @flow

import variable from "../../variables/platform-light";

export default (variables /* : * */ = variable) => {
  return {
    statusBarContent: variables.statusBarContent,
    bg_1: variables.bg_1,
    bg_2: variables.bg_2,
    bg_3: variables.bg_3,
    boardListBg: variables.boardListBg,
    backdrop: variables.backdrop,
    text_1: variables.text_1,
    text_2: variables.text_2,
    text_3: variables.text_3,
    backBg_1: { backgroundColor: variables.bg_1 },
    backBg_2: { backgroundColor: variables.bg_2 },
    backBg_3: { backgroundColor: variables.bg_3 },
    boardHeader: { backgroundColor: variables.boardHeaderColor },
    colorText_1: { color: variables.text_1 },
    colorText_2: { color: variables.text_2 },
    colorText_3: { color: variables.text_3 },
  };
};
