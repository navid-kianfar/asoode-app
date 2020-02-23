import ActionNames from "./action-names";

const INITIAL_STATE = {
  waiting: false,
  items: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.ChatDetailClear:
      return { ...state, items: [] };
    case ActionNames.ChatDetailFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.ChatDetailFetchSuccess:
      return {
        ...state,
        waiting: false,
        // TODO: THIS HAS TO BE REMOVED!!!! [reverse()]
        items: action.payload.reverse()
      };
    default:
      return state;
  }
};
