import ActionNames from "./action-names";

const INITIAL_STATE = {
  refreshing: false,
  waiting: false,
  loaded: false,
  data: {
    beginDate: null,
    boardReports: [],
    dayReports: [],
    endDate: null,
    filterTotalDone: 0,
    filterTotalTasks: 0,
    totalDone: 0,
    totalTasks: 0
  },
  chart: {
    labels: Array(15).fill(" "),
    datasets: [{ data: Array(15).fill(0) }]
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.DashboardRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.DashboardFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.DashboardFetchSuccess:
      return {
        ...state,
        data: action.payload.data,
        chart: action.payload.chart,
        loaded: true,
        waiting: false,
        refreshing: false
      };
    default:
      return state;
  }
};
