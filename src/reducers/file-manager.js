import ActionNames from "./action-names";
import PropTypes from "prop-types";
import { FileItemDTO, FolderItemDTO } from "../dtos/file-manager.dtos";
const INITIAL_STATE = {
  previewPercent: 0,
  waiting: false,
  refreshing: false,
  path: "/",
  prevPath: "",
  items: {
    files: [],
    folders: []
  }
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.FileManagerRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.FileManagerPreviewPercentChanged:
      return { ...state, previewPercent: action.payload };
    case ActionNames.FileManagerFetchStart:
      const prevPath = (action.payload.path === "/" ? "" : state.path)
        .split("/")
        .filter(p => p !== "");
      if (prevPath.length) prevPath.pop();
      if (action.payload.path !== "/" && !prevPath.length) {
        prevPath.push("/");
      }
      return {
        ...state,
        waiting:
          action.payload.waiting !== undefined ? action.payload.waiting : true,
        path: action.payload.path,
        prevPath: prevPath.length ? prevPath.join("/") : ""
      };
    case ActionNames.FileManagerFetchSuccess:
      return {
        ...state,
        refreshing: false,
        waiting: false,
        items: action.payload
      };
    default:
      return state;
  }
};
