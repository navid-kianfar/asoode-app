import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class BoardService {
  async colors(dispatch) {
    const op = await HttpService.post("/user/board-colors/list");
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.BoardColorsFetchSuccess,
        payload: op.data
      });
    }
  }
  async pictures(dispatch) {
    const op = await HttpService.post("/user/board-pictures/list");
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.BoardPicturesFetchSuccess,
        payload: op.data
      });
    }
  }
  async fetch(dispatch) {
    const op = await HttpService.post("/user/boards/list");
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.BoardListFetchSuccess,
        payload: op.data
      });
    }
  }
  async archived(dispatch) {
    dispatch({ type: ActionNames.BoardArchivedListFetchStart });
    const op = await HttpService.post("/user/boards/archived-list");
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.BoardArchivedListFetchSuccess,
        payload: op.data
      });
    }
  }

  async fetchDetail(dispatch, id, archived, skip) {
    dispatch({ type: ActionNames.BoardDetailFetchStart, payload: !skip });
    const payload = archived ? { state: Enums.BoardState.ArchivedBoard } : {};
    const op = await HttpService.post("/user/boards/detail/" + id, payload);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.BoardDetailFetchSuccess,
      payload: op.data
    });
  }
}

const instance = new BoardService();
export default instance;
