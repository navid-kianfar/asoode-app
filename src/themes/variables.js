import { Dimensions, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");
const commonColors = {
  primary: "#1775ef",
  success: "#61bd4f",
  danger: "#f55555",
  // danger: "#eb5a46",
  warning: "#f2d600",
  info: "#00c2e0",
  starred: "#e6c60d",
  text_3: "#fff",
  offline: "#f2f4f6",
  online: "#6dd230",
  defaultBoardBg: "#97a7b0",
  stateTodo: "#778ca2",
  stateDone: "#00c2e0",
  stateInProgress: "#61bd4f",
  statePaused: "#f2d600",
  stateCancelled: "#9a372a",
  stateBlocked: "#eb5a46",
  stateDuplicate: "#ffc107"
};
export const Themes = {
  dark: {
    bg_1: "#1c1c1e",
    bg_2: "#000",
    bg_3: "#363638",
    backdrop: "#fff",
    boardHeaderColor: "#0009",
    buttonAddListBg: "#0009",
    footerBg: "#131313",
    footerText: "#7f7f7f",
    memberBg: "#39383d",
    text_1: "#fff",
    text_2: "#4f4e53",
    listBg: "#5b5a5f",
    statusBarContent: "light-content",
    ...commonColors
  },
  light: {
    bg_1: "#fff",
    bg_2: "#f8fafb",
    bg_3: "#f2f4f6",
    backdrop: "#000",
    boardHeaderColor: "#fff9",
    buttonAddListBg: "#fff9",
    // footerBg: "#f4f4f4",
    footerBg: "#fff",
    footerText: "#939393",
    memberBg: "#dfe3e6",
    text_1: "#252631",
    text_2: "#778ca2",
    listBg: "#f2f5fc",
    statusBarContent: "dark-content",
    ...commonColors
  }
};
export const Metrics = {
  WIDTH: width,
  HEIGHT: height,
  rem: 16,
  modalHeader: 80,
  SafeHeight: height - (StatusBar.currentHeight || 20)
};
export const Colors = Themes.dark;
