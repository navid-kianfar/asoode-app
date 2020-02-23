import ActionNames from "./action-names";

const INITIAL_STATE = {
  refreshing: false,
  waiting: false,
  profile: null,
  transactions: null,
  dark: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.ChangeTheme:
      return { ...state, dark: action.payload };
    case ActionNames.ProfileRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.TransactionsFetchStart:
      return { ...state, transactions: null };
    case ActionNames.TransactionsFetchSuccess:
      return { ...state, transactions: action.payload };
    case ActionNames.TimeSpentToggleWorkingSuccess:
      const profile = { ...state.profile };
      if (profile.underWayTeamId) {
        profile.underWayTeamId = undefined;
      } else {
        profile.underWayTeamId = action.payload;
      }
      return { ...state, profile };
    case ActionNames.ProfileFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.ProfileFetchSuccess:
      return {
        ...state,
        profile: action.payload,
        waiting: false,
        refreshing: false
      };
    default:
      return state;
  }
};
