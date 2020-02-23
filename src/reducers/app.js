import ActionNames from "./action-names";

const INITIAL_STATE = {
  dark: false
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === ActionNames.ChangeTheme) {
    return { ...state, dark: action.payload };
  } else {
    return state;
  }
};
