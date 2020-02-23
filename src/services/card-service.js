import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";
class CardService {
  async fetch(dispatch, id, skip) {
    dispatch({
      type: ActionNames.CardDetailFetchStart,
      payload: { id, skip: skip }
    });
    const op = await HttpService.post("/user/cards/detail/" + id);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.CardDetailFetchSuccess,
      payload: { id, data: op.data }
    });
  }
}
const instance = new CardService();
export default instance;
