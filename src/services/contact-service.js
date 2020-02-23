import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";
class ContactService {
  async fetch(dispatch, skip) {
    dispatch({ type: ActionNames.ContactsFetchStart, payload: !skip });
    const op = await HttpService.post("/user/contacts/all");
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.ContactsFetchSuccess,
      payload: op.data
    });
  }
  async sync(dispatch, data) {
    dispatch({ type: ActionNames.ContactsSyncStart, payload: data });
    const op = await HttpService.post("/user/contacts/import/device", data);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.ContactsSyncSuccess,
      payload: op.data
    });
    await this.fetch(dispatch, false);
  }
}
const instance = new ContactService();
export default instance;
