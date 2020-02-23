import HttpService from "./http-service";
import * as Enums from "../library/enums";
import AsyncStorage from "@react-native-community/async-storage";
import Constants from "../library/constants";
import ActionNames from "../reducers/action-names";

class IdentityService {
  userId = "";
  async restoreToken() {
    const auth = await AsyncStorage.getItem(Constants.APP_TOKEN);
    if (auth) {
      const parsed = JSON.parse(auth);
      this.userId = parsed.userId;
      HttpService.token = parsed.token;
    }
    return auth;
  }
  async login(params) {
    const op = await HttpService.post("/account/membership/login", params);
    if (op.data && op.data.token) {
      this.userId = op.data.userId;
      HttpService.token = op.data.token;
      await AsyncStorage.setItem(Constants.APP_TOKEN, JSON.stringify(op.data));
    }
    return op;
  }
  async confirmPhone(params) {
    const op = await HttpService.post("/account/confirm-phone", params);
    if (op.data && op.data.token) {
      this.userId = op.data.userId;
      HttpService.token = op.data.token;
      await AsyncStorage.setItem(Constants.APP_TOKEN, JSON.stringify(op.data));
    }
    return op;
  }
  async register(params) {
    return await HttpService.post("/account/membership/register", params);
  }
  async removeAvatar() {
    return await HttpService.post("/account/remove-picture");
  }
  async changeAvatar(source) {
    const image = {
      uri: source.path,
      type: source.mime,
      name: source.filename
    };
    return await HttpService.upload("/account/change-picture", {
      avatar: image
    });
  }
  async profile(dispatch) {
    if (dispatch) dispatch({ type: ActionNames.ProfileFetchStart });
    const op = await HttpService.post("/account/profile");
    if (op.status === Enums.OperationResultStatus.Success && dispatch) {
      dispatch({
        type: ActionNames.ProfileFetchSuccess,
        payload: op.data
      });
    }
    return op;
  }
  async transactions(dispatch, skip, page = 1) {
    dispatch({ type: ActionNames.TransactionsFetchStart, payload: !skip });
    const op = await HttpService.post("/user/transactions/filter", {
      page,
      pageSize: 10
    });
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.TransactionsFetchSuccess,
        payload: op.data
      });
    }
  }
  async support(dispatch, skip, page = 1) {
    dispatch({ type: ActionNames.SupportFetchStart, payload: !skip });
    const op = await HttpService.post("/user/supports/filter", {
      page,
      pageSize: 20
    });
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.SupportFetchSuccess,
        payload: op.data
      });
    }
  }
  async supportDetail(dispatch, id) {
    dispatch({ type: ActionNames.SupportDetailFetchStart });
    const op = await HttpService.post("/user/supports/detail/" + id);
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.SupportDetailFetchSuccess,
        payload: op.data
      });
    }
  }
  async supportMessage(dispatch, id, message) {
    const op = await HttpService.post("/user/supports/reply/" + id, {
      title: message
    });
    if (op.status === Enums.OperationResultStatus.Success) {
      dispatch({
        type: ActionNames.SupportMessageSent,
        payload: message
      });
    }
  }
  handleError(op): string {
    switch (op.status) {
      case Enums.OperationResultStatus.Rejected:
        return "CORE_GENERAL_OPERATIONRESULTS_REJECTED";
      case Enums.OperationResultStatus.UnAuthorized:
        return "CORE_GENERAL_OPERATIONRESULTS_UNAUTHORIZED";
      case Enums.OperationResultStatus.Validation:
        return "CORE_GENERAL_OPERATIONRESULTS_VALIDATION";
      case Enums.OperationResultStatus.Failed:
        return "CORE_GENERAL_OPERATIONRESULTS_FAILED";
      case Enums.OperationResultStatus.Captcha:
        return "CORE_GENERAL_OPERATIONRESULTS_CAPTCHA";
    }

    if (op.data.notFound) {
      return "ACCOUNT_NOTFOUND";
    }
    if (op.data.lockedOut) {
      return "ACCOUNT_LOCKEDOUT";
    }
    if (op.data.invalidPassword) {
      return "ACCOUNT_INVALID_USERNAME_PASSWORD";
    }
    if (op.data.phoneNotConfirmed) {
      return "ACCOUNT_PHONE_NOT_CONFIRMED";
    }
    if (op.data.emailNotConfirmed) {
      return "ACCOUNT_EMAIL_NOT_CONFIRMED";
    }
    if (op.data.duplicate) {
      return "ACCOUNT_DUPLICATE";
    }
    if (op.data.smsFailed) {
      return "ACCOUNT_SMS_FAILED";
    }
    if (op.data.emailFailed) {
      return "ACCOUNT_EMAIL_FAILED";
    }
    return null;
  }

}

const instance = new IdentityService();
export default instance;
