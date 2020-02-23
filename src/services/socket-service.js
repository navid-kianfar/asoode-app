import IdentityService from "./identity-service";
import * as IO from "socket.io-client";
import ActionNames from "../reducers/action-names";

class SocketService {
  dispatch = null;
  socket = null;
  connected = false;
  init(dispatch) {
    this.dispatch = dispatch;
    this.socket = IO.connect("wss://asoode.com:3000", {
      transports: ["websocket"],
      query: {
        userId: IdentityService.userId
      }
    });
    this.socket.on("connect", () => {
      this.connected = true;
      console.log("websocket connection opened");
    });
    this.socket.on("disconnect", () => {
      this.connected = false;
      console.log("websocket connection closed");
    });
    this.socket.on("push-notification", data => {
      console.log("push-notification", data);
      dispatch({
        type: ActionNames.OnWebSocketMessage,
        payload: data
      });
    });
  }
}
const instance = new SocketService();
export default instance;
