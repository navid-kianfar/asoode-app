import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class SearchRefresh {
  async filter(dispatch, query, skip) {
    dispatch({ type: ActionNames.SearchFetchStart, payload: !skip });
    const op = await HttpService.post("/user/search", {
      title: query
    });
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.SearchFetchSuccess,
      payload: op.data
    });
  }
}
const instance = new SearchRefresh();
export default instance;
