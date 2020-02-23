import ActionNames from "./action-names";

const INITIAL_STATE = {
  refreshing: false,
  syncing: false,
  waiting: false,
  contacts: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.ContactsRefresh:
      return { ...state, refreshing: action.payload, syncing: false };
    case ActionNames.ContactsFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true,
        syncing: false
      };
    case ActionNames.ContactsFetchSuccess:
      return {
        ...state,
        refreshing: false,
        waiting: false,
        contacts: action.payload,
        syncing: false
      };
    case ActionNames.ContactsSyncStart:
      return {
        ...state,
        syncing: true
      };
    case ActionNames.ContactsSyncSuccess:
      return {
        ...state,
        syncing: false
      };
    default:
      return state;
  }
};
