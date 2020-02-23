import ActionNames from "./action-names";
const INITIAL_STATE = {
  waiting: false,
  refreshing: false,
  items: []
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.AutomationRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.AutomationFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.AutomationFetchSuccess:
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
