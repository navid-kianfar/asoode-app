import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";
import { DateHelpers } from "../library/date-helpers";

class TimeSpentService {
  async toggleWorking(dispatch, id) {
    dispatch({ type: ActionNames.TimeSpentToggleWorkingStart });
    const op = await HttpService.post("/user/teams/toggle-working/" + id);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({ type: ActionNames.TimeSpentToggleWorkingSuccess, payload: id });
  }
  async fetch(dispatch, model, skip) {
    dispatch({ type: ActionNames.TimeSpentDetailFetchStart, payload: !skip });
    const beginDate = DateHelpers.truncateTime(model.date, true);
    const endDate = model.date;
    const params = { beginDate, endDate, teamId: model.id };
    const op = await HttpService.post("/user/reports/timespent", params);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.TimeSpentDetailFetchSuccess,
      payload: op.data
    });
  }
}
const instance = new TimeSpentService();
export default instance;
