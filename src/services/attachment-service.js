import HttpService from "./http-service";
import * as Enums from "../library/enums";
import ActionNames from "../reducers/action-names";

class AttachmentService {
  async filterBoardAndCards(query) {
    return await HttpService.post("/user/attachments/search", { title: query });
  }
}
const instance = new AttachmentService();
export default instance;
