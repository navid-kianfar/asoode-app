import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class ChatService {
  async detail(dispatch, section, id) {
    dispatch({ type: ActionNames.ChatDetailFetchStart });
    const op = await HttpService.post("/user/chats/" + section + "/" + id);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.ChatDetailFetchSuccess,
      payload: op.data
    });
  }
  async fetch(dispatch, skip) {
    dispatch({ type: ActionNames.ChatFetchStart, payload: !skip });
    const op = await HttpService.post("/user/chats/latest-chats");
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.ChatFetchSuccess,
      payload: op.data
    });
  }
}
const instance = new ChatService();
export default instance;
