import ActionNames from "./action-names";

const INITIAL_STATE = {
  detailWaiting: false,
  detail: {},
  archivedRefreshing: false,
  archivedWaiting: false,
  archived: [],
  waiting: false,
  starredBoards: [],
  recentBoards: [],
  personalBoards: [],
  teamedBoards: [],
  colors: [],
  pictures: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.BoardDetailRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.BoardDetailFetchStart:
      return {
        ...state,
        detail: {},
        detailWaiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.BoardDetailFetchSuccess:
      return {
        ...state,
        refreshing: false,
        detailWaiting: false,
        detail: action.payload
      };
    case ActionNames.BoardFetchStart:
      return { ...state, waiting: true };
    case ActionNames.BoardColorsFetchSuccess:
      return { ...state, colors: action.payload };
    case ActionNames.BoardPicturesFetchSuccess:
      return { ...state, pictures: action.payload };
    case ActionNames.BoardListFetchSuccess:
      return {
        ...state,
        waiting: false,
        starredBoards: action.payload.starredBoards,
        recentBoards: action.payload.recentBoards,
        personalBoards: action.payload.personalBoards,
        teamedBoards: action.payload.teamedBoards
      };
    case ActionNames.BoardArchivedRefresh:
      return { ...state, archivedRefreshing: action.payload };
    case ActionNames.BoardArchivedListFetchStart:
      return { ...state, archivedWaiting: true, archived: [] };
    case ActionNames.BoardArchivedListFetchSuccess:
      return {
        ...state,
        archivedWaiting: false,
        archived: action.payload,
        archivedRefreshing: false
      };
    default:
      return state;
  }
};
