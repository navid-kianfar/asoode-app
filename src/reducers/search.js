import ActionNames from "./action-names";
import { SearchSections } from "../library/enums";
const INITIAL_STATE = {
  waiting: false,
  refreshing: false,
  filter: "",
  section: SearchSections.Cards,
  dirty: false,
  items: null
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.SearchSwitchSection:
      return { ...state, section: action.payload };
    case ActionNames.SearchRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.SearchChangeFilter:
      return { ...state, filter: action.payload };
    case ActionNames.SearchFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.SearchFetchSuccess:
      return {
        ...state,
        refreshing: false,
        waiting: false,
        dirty: true,
        items: action.payload
      };
    default:
      return state;
  }
};
