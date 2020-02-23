import ActionNames from "./action-names";

const INITIAL_STATE = {
  refreshing: false,
  archivedWaiting: false,
  waiting: false,
  currentWaiting: false,
  teams: [],
  archived: [],
  current: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.TeamRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.TeamFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.TeamFetchSuccess:
      return {
        ...state,
        refreshing: false,
        waiting: false,
        teams: action.payload
      };
    case ActionNames.TeamBoardArchivedListFetchStart:
      return { ...state, archivedWaiting: true, archived: [] };
    case ActionNames.TeamBoardArchivedListFetchSuccess:
      return { ...state, archivedWaiting: false, archived: action.payload };
    default:
      return state;
  }
};
