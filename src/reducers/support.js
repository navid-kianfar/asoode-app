import ActionNames from "./action-names";
import Guid from '../library/guid';

const INITIAL_STATE = {
  refreshing: false,
  waiting: false,
  sending: false,
  items: null,
  detail: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.SupportRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.SupportFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.SupportFetchSuccess:
      return {
        ...state,
        refreshing: false,
        waiting: false,
        items: action.payload
      };
    case ActionNames.SupportMessageSent:
      return { ...state, items: [{
        id: Guid(),
        description: action.payload,
        createdAt: new Date()
      }, ...state.items] };
    case ActionNames.SupportDetailRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.SupportDetailFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.SupportDetailFetchSuccess:
      action.payload.replies.push({
        createdAt: action.payload.createdAt,
        description: action.payload.description,
        id: action.payload.id,
        isAdminReply: false,
        seenByAdmin: action.payload.createdAt < action.payload.lastVisited,
        seenByUser: true
      });
      return {
        ...state,
        waiting: false,
        detail: action.payload.replies
      };
    default:
      return state;
  }
};
