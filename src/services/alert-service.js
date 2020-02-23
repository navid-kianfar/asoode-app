import I18n from "../i18n.js";
import ActionNames from "../reducers/action-names";

class AlertService {
  dispatch = null;
  close() {
    this.dispatch({
      type: ActionNames.AlertClose,
      payload: null
    });
  }
  error(message, title, buttons, options) {
    options = options || {};
    options.type = "error";
    if (options.icon === undefined) {
      options.icon = {
        type: "SimpleLineIcons",
        name: "close"
      };
    }
    title = title === undefined ? "CORE_GENERAL_ERROR_TITLE" : title;
    buttons =
      buttons !== undefined ? buttons : [{ text: I18n.t("OK") }];
    this.alert(
      title ? I18n.t(title) : "",
      message ? I18n.t(message) : null,
      buttons,
      options,
      []
    );
  }
  success(message, title, buttons, options) {
    options = options || {};
    options.type = "success";
    title = title === undefined ? "CORE_GENERAL_SUCCESS_TITLE" : title;
    buttons =
      buttons !== undefined ? buttons : [{ text: I18n.t("OK"), style: "ok" }];
    this.alert(
      title ? I18n.t(title) : "",
      I18n.t(message),
      buttons,
      options,
      []
    );
  }
  warning(message, title, buttons, options) {
    options = options || {};
    options.type = "warning";
    title = title === undefined ? "CORE_GENERAL_WARNING_TITLE" : title;
    buttons =
      buttons !== undefined ? buttons : [{ text: I18n.t("OK"), style: "ok" }];
    this.alert(
      title ? I18n.t(title) : "",
      I18n.t(message),
      buttons,
      options,
      []
    );
  }
  info(message, title, buttons, options) {
    options = options || {};
    options.type = "info";
    title = title === undefined ? "CORE_GENERAL_INFO_TITLE" : title;
    buttons = buttons !== undefined ? buttons : [{ text: I18n.t("OK") }];
    this.alert(
      title ? I18n.t(title) : "",
      I18n.t(message),
      buttons,
      options,
      []
    );
  }
  confirm(message, title, buttons, options) {
    options = options || {};
    options.type = "confirm";
    if (options.icon === undefined) {
      options.icon = {
        type: "SimpleLineIcons",
        name: "check"
      };
    }
    title = title || "CORE_GENERAL_CONFIRM";
    buttons = buttons !== undefined ? buttons : [{ text: I18n.t("OK") }];
    this.alert(
      I18n.t(title),
      message ? I18n.t(message) : null,
      buttons,
      options,
      []
    );
  }
  prompt(title, message, form, buttons, options) {
    options = options || {};
    options.type = "prompt";
    this.alert(
      title ? I18n.t(title) : "",
      message ? I18n.t(message) : "",
      buttons,
      options,
      form
    );
  }
  alert(title, message, buttons, options, form) {
    this.dispatch({
      type: ActionNames.AlertShow,
      payload: { title, message, buttons, options, form }
    });
  }
}
const instance = new AlertService();
export default instance;
