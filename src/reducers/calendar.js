import ActionNames from "./action-names";
import { DateHelpers } from "../library/date-helpers";

const INITIAL_STATE = {
  refreshing: false,
  waiting: false,
  items: [],
  filtered: [],
  date: new Date()
};

const filter = (items, date) => {
  return items.filter(i => DateHelpers.sameDate(date, new Date(i.dueDate)));
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionNames.CalendarRefresh:
      return { ...state, refreshing: action.payload };
    case ActionNames.CalendarFetchStart:
      return {
        ...state,
        waiting: action.payload !== undefined ? action.payload : true
      };
    case ActionNames.CalendarUpdate:
      return {
        ...state,
        date: action.payload,
        filtered: filter(state.items, action.payload)
      };
    case ActionNames.CalendarFetchSuccess:
      return {
        ...state,
        waiting: false,
        refreshing: false,
        items: action.payload,
        filtered: filter(action.payload, state.date)
      };
    default:
      return state;
  }
};
