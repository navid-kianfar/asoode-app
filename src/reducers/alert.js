import ActionNames from "./action-names";

const INITIAL_STATE = {
  isVisible: false,
  inputs: [],
  title: "",
  message: "",
  buttons: [],
  options: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.AlertShow:
      return {
        ...state,
        ...action.payload,
        isVisible: true
      };
    case ActionNames.AlertClose:
      return {
        ...state,
        isVisible: false
        // inputs: [],
        // title: "",
        // message: "",
        // options: {},
        // buttons: [],
      };
    default:
      return state;
  }
};
