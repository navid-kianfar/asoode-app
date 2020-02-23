import ActionNames from "./action-names";
const INITIAL_STATE = {
  waitingToggle: false,
  waiting: false,
  refreshing: false,
  items: [],
  waitingDetail: false,
  refreshingDetail: false,
  canStartWorking: false,
  detail: { rows: [] },
  date: new Date(),
  loaded: false
};
const Map = data => {
  data.days.shift();
  data.days[0].rows = data.days[0].rows.map(row => {
    return {
      member: row.member,
      data: row.items
    };
  });
  return data.days[0];
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ActionNames.TimeSpentRefresh:
    //   return { ...state, refreshing: action.payload };
    // case ActionNames.TimeSpentFetchStart:
    //   return {
    //     ...state,
    //     waiting: action.payload !== undefined ? action.payload : true
    //   };
    // case ActionNames.TimeSpentFetchSuccess:
    //   return {
    //     ...state,
    //     refreshing: false,
    //     waiting: false,
    //     items: action.payload
    //   };
    case ActionNames.TimeSpentToggleWorkingStart:
      return { ...state, waitingToggle: true };
    case ActionNames.TimeSpentToggleWorkingSuccess:
      return {
        ...state,
        waitingToggle: false,
        canStartWorking: !state.canStartWorking
      };
    case ActionNames.TimeSpentDetailUpdate:
      return { ...state, date: action.payload };
    case ActionNames.TimeSpentDetailRefresh:
      return { ...state, refreshingDetail: action.payload };
    case ActionNames.TimeSpentDetailFetchStart:
      return {
        ...state,
        canStartWorking: false,
        detail: { rows: [] },
        loaded: false,
        waitingDetail: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.TimeSpentDetailFetchSuccess:
      return {
        ...state,
        refreshingDetail: false,
        waitingDetail: false,
        loaded: true,
        detail: Map(action.payload),
        canStartWorking: action.payload.canStartWorking
      };
    default:
      return state;
  }
};
