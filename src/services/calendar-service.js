import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class CalendarService {
  async fetch(dispatch, skip) {
    dispatch({ type: ActionNames.CalendarFetchStart, payload: !skip });
    const op = await HttpService.post("/user/calendar/fetch", {
      boardId: null,
      from: null,
      to: null
    });
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.CalendarFetchSuccess,
      payload: op.data
    });
  }
}
const instance = new CalendarService();
export default instance;
