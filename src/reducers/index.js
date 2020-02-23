import { combineReducers } from "redux";
import AuthReducer from "./auth";
import DashboardReducer from "./dashboard";
import SearchReducer from "./search";
import BoardReducer from "./board";
import CalendarReducer from "./calendar";
import AutomationReducer from "./automation";
import FileManagerReducer from "./file-manager";
import TimeSpentReducer from "./time-spents";
import CardReducer from "./card";
import ChatReducer from "./chat";
import NotificationReducer from "./notification";
import ContactReducer from "./contact";
import ChatDetailReducer from "./chat-detail";
import SupportReducer from "./support";
import TeamReducer from "./team";
import OrganizationReducer from "./organization";
import AppReducer from "./app";
import AlertReducer from "./alert";

export default combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  dashboard: DashboardReducer,
  timeSpent: TimeSpentReducer,
  fileManager: FileManagerReducer,
  automation: AutomationReducer,
  board: BoardReducer,
  notification: NotificationReducer,
  search: SearchReducer,
  calendar: CalendarReducer,
  contact: ContactReducer,
  chat: ChatReducer,
  card: CardReducer,
  chatDetail: ChatDetailReducer,
  support: SupportReducer,
  team: TeamReducer,
  organization: OrganizationReducer,
  alert: AlertReducer
});
