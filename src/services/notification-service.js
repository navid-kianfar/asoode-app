import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class NotificationService {
  async fetchSetting(dispatch, skip) {
    dispatch({
      type: ActionNames.NotificationSettingFetchStart,
      payload: !skip
    });
    const op = await HttpService.post("/push-notification/list");
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.NotificationSettingFetchSuccess,
        payload: op.data
      });
    }
  }
  async activities(dispatch, skip, page = 1) {
    dispatch({
      type: ActionNames.NotificationActivitiesFetchStart,
      payload: !skip
    });
    const op = await HttpService.post("/user/activities/alerts", {
      page,
      pageSize: 20
    });
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.NotificationActivitiesFetchSuccess,
        payload: op.data
      });
    }
  }
  async notifications(dispatch, skip, page = 1) {
    dispatch({ type: ActionNames.NotificationFetchStart, payload: !skip });
    const op = await HttpService.post("/push-notification/reminders", {
      page,
      pageSize: 20
    });
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.NotificationFetchSuccess,
        payload: op.data
      });
    }
  }
}
const instance = new NotificationService();
export default instance;
