import ActionNames from "./action-names";

const INITIAL_STATE = {
  refreshing: false,
  waiting: false,
  teams: [],
  boards: [],
  organs: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.ChatRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.ChatFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.ChatFetchSuccess:
      return {
        ...state,
        waiting: false,
        teams: action.payload.teams,
        boards: action.payload.boards,
        organs: action.payload.organs,
        refreshing: false
      };
    default:
      return state;
  }
};
