import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class FileManagerService {
  async fetch(dispatch, path, skip) {
    dispatch({
      type: ActionNames.FileManagerFetchStart,
      payload: {
        path,
        waiting: !skip
      }
    });
    const op = await HttpService.post("/file-manager/list", { path });
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.FileManagerFetchSuccess,
      payload: op.data
    });
  }
  async createFolder(dispatch, model) {
    dispatch({
      type: ActionNames.FileManagerCreateFolderStart,
      payload: model
    });
    const op = await HttpService.post("/file-manager/new-folder", model);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.FileManagerCreateFolderSuccess,
      payload: op.data
    });
  }
}
const instance = new FileManagerService();
export default instance;
