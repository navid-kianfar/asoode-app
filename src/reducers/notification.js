import ActionNames from "./action-names";

const INITIAL_STATE = {
  refreshing: false,
  waiting: false,
  settingRefreshing: false,
  settingWaiting: false,
  activitiesRefreshing: false,
  activitiesWaiting: false,
  notificationsRefreshing: false,
  notificationsWaiting: false,
  setting: null,
  activities: null,
  notifications: null
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.NotificationRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.NotificationFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.NotificationFetchSuccess:
      return {
        ...state,
        refreshing: false,
        waiting: false,
        notifications: action.payload
      };
    case ActionNames.NotificationActivitiesRefresh:
      return { ...state, activitiesRefreshing: action.payload };
    case ActionNames.NotificationActivitiesFetchStart:
      return {
        ...state,
        activitiesWaiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.NotificationActivitiesFetchSuccess:
      return {
        ...state,
        activitiesRefreshing: false,
        activitiesWaiting: false,
        activities: action.payload
      };
    case ActionNames.NotificationSettingRefresh:
      return { ...state, settingRefreshing: action.payload };
    case ActionNames.NotificationSettingFetchStart:
      return {
        ...state,
        settingWaiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.NotificationSettingFetchSuccess:
      return {
        ...state,
        settingRefreshing: false,
        settingWaiting: false,
        setting: action.payload
      };
    default:
      return state;
  }
};
