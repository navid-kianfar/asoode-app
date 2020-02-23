import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";
import { DateHelpers } from "../library/date-helpers";

class ReportService {
  async dashboard(dispatch, skip) {
    dispatch({ type: ActionNames.DashboardFetchStart, payload: !skip });
    let startDate = new Date();
    startDate.setUTCDate(startDate.getUTCDate() - 15);
    startDate = DateHelpers.truncateTime(startDate, true);
    const endDate = DateHelpers.truncateTime(new Date(), true);
    const payload = {
      beginDate: startDate,
      endDate: endDate,
      boardIds: []
    };
    const op = await HttpService.post("/user/reports/dashboard", payload);
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    const chart = {};
    chart.labels = Array(op.data.dayReports.length).fill(" ");
    chart.datasets = [{ data: op.data.dayReports.map(i => i.totalDone) }];
    dispatch({
      type: ActionNames.DashboardFetchSuccess,
      payload: { data: op.data, chart }
    });
  }
}
const instance = new ReportService();
export default instance;
