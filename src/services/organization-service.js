import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";
import { DateHelpers } from "../library/date-helpers";

class OrganizationService {
  async fetch(dispatch, skip) {
    dispatch({ type: ActionNames.OrganizationFetchStart, payload: !skip });
    const op = await HttpService.post("/user/organizations/detailed-list");
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.OrganizationFetchSuccess,
      payload: op.data
    });
  }
  async graph(dispatch, id, skip) {
    dispatch({ type: ActionNames.OrganizationGraphFetchStart, payload: !skip });
    const op = await HttpService.post("/user/organizations/get/" + id);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.OrganizationGraphFetchSuccess,
      payload: op.data
    });
  }
  async boards(dispatch, id, skip) {
    dispatch({
      type: ActionNames.OrganizationBoardsFetchStart,
      payload: !skip
    });
    const op = await HttpService.post(
      "/user/organizations/setting/board-list/" + id
    );
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.OrganizationBoardsFetchSuccess,
      payload: op.data
    });
  }
  async faq(dispatch, id, skip) {
    dispatch({ type: ActionNames.OrganizationFaqFetchStart, payload: !skip });
    const op = await HttpService.post(
      // "/user/organizations/faqs/categories/list/" + id
      "/user/organizations/faqs/all/" + id
    );
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    dispatch({
      type: ActionNames.OrganizationFaqFetchSuccess,
      payload: op.data
    });
  }
  async reports(dispatch, id, skip) {
    dispatch({
      type: ActionNames.OrganizationReportsFetchStart,
      payload: !skip
    });
    let startDate = new Date();
    startDate.setUTCDate(startDate.getUTCDate() - 15);
    startDate = DateHelpers.truncateTime(startDate, true);
    const endDate = DateHelpers.truncateTime(new Date(), true);
    const payload = {
      beginDate: startDate,
      endDate: endDate
    };
    const op = await HttpService.post(
      "/user/organizations/reports/" + id,
      payload
    );
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    Object.assign(op.data, payload);
    dispatch({
      type: ActionNames.OrganizationReportsFetchSuccess,
      payload: op.data
    });
  }
}
const instance = new OrganizationService();
export default instance;
