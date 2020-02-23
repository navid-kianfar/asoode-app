import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class AutomationService {
  async fetch(dispatch, skip) {
    dispatch({ type: ActionNames.AutomationFetchStart, payload: !skip });
    const op = await HttpService.post("/user/automations/filter");
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.AutomationFetchSuccess,
      payload: op.data
    });
  }
}
const instance = new AutomationService();
export default instance;
