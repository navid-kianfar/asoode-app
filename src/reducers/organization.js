import ActionNames from "./action-names";

const INITIAL_STATE = {
  refreshing: false,
  waiting: false,
  graphRefreshing: false,
  graphWaiting: false,
  faqRefreshing: false,
  faqWaiting: false,
  boardsRefreshing: false,
  boardsWaiting: false,
  reportsRefreshing: false,
  reportsWaiting: false,
  currentWaiting: false,
  organizations: [],
  graph: null,
  faq: null,
  faqDetail: null,
  boards: null,
  reports: null,
  chartData: null,
  graphData: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.OrganizationRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.OrganizationFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.OrganizationFetchSuccess:
      return {
        ...state,
        refreshing: false,
        waiting: false,
        organizations: action.payload
      };
    case ActionNames.OrganizationGraphRefresh:
      return { ...state, graphRefreshing: action.payload };
    case ActionNames.OrganizationGraphFetchStart:
      return {
        ...state,
        graphWaiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.OrganizationGraphFetchSuccess:
      return {
        ...state,
        graphRefreshing: false,
        graphWaiting: false,
        graph: action.payload,
        graphData: [action.payload]
      };
    case ActionNames.OrganizationFaqRefresh:
      return { ...state, faqRefreshing: action.payload };
    case ActionNames.OrganizationFaqFetchStart:
      return {
        ...state,
        faqWaiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.OrganizationFaqFetchSuccess:
      return {
        ...state,
        faqRefreshing: false,
        faqWaiting: false,
        faq: action.payload
      };
    case ActionNames.OrganizationBoardsRefresh:
      return { ...state, boardsRefreshing: action.payload };
    case ActionNames.OrganizationBoardsFetchStart:
      return {
        ...state,
        boardsWaiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.OrganizationBoardsFetchSuccess:
      return {
        ...state,
        boardsRefreshing: false,
        boardsWaiting: false,
        boards: action.payload
      };
    case ActionNames.OrganizationReportsRefresh:
      return { ...state, reportsRefreshing: action.payload };
    case ActionNames.OrganizationReportsFetchStart:
      return {
        ...state,
        reportsWaiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.OrganizationReportsFetchSuccess:
      return {
        ...state,
        reportsRefreshing: false,
        reportsWaiting: false,
        reports: action.payload,
        chartData: [
          {
            label: "CREATED_CARDS",
            filtered: action.payload.filterCards,
            total: action.payload.totalCards,
            chart: {
              labels: Array(15).fill(" "),
              datasets: [
                {
                  data: action.payload.days.map(day => day.totalCreatedCards)
                }
              ]
            }
          },
          {
            label: "DONE_CARDS",
            filtered: action.payload.filterDoneCards,
            total: action.payload.totalDoneCards,
            chart: {
              labels: Array(15).fill(" "),
              datasets: [
                {
                  data: action.payload.days.map(day => day.totalDoneCards)
                }
              ]
            }
          },
          {
            label: "CREATED_BOARDS",
            filtered: action.payload.filterBoards,
            total: action.payload.totalBoards,
            chart: {
              labels: Array(15).fill(" "),
              datasets: [
                {
                  data: action.payload.days.map(day => day.totalBoards)
                }
              ]
            }
          },
          {
            label: "CREATED_TEAMS",
            filtered: action.payload.filterTeams,
            total: action.payload.totalTeams,
            chart: {
              labels: Array(15).fill(" "),
              datasets: [
                {
                  data: action.payload.days.map(day => day.totalTeams)
                }
              ]
            }
          }
        ]
      };
    default:
      return state;
  }
};
