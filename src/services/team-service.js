import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class OrganizationService {
  async fetch(dispatch, skip) {
    dispatch({ type: ActionNames.TeamFetchStart, payload: !skip });
    const op = await HttpService.post("/user/teams/detailed-list");
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.TeamFetchSuccess,
      payload: op.data
    });
  }

  async archivedBoards(dispatch, id, skip) {
    dispatch({
      type: ActionNames.TeamBoardArchivedListFetchStart,
      payload: !skip
    });
    const op = await HttpService.post("/user/teams/archived-boards/" + id);
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.TeamBoardArchivedListFetchSuccess,
        payload: op.data.boards
      });
    }
  }
}
const instance = new OrganizationService();
export default instance;
