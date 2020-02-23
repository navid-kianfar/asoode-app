import { PaymentStatus, TaskState } from "./enums";
import { Colors } from "../themes/variables";
import { Platform } from "react-native";

export const getStateColor = state => {
  switch (state) {
    case TaskState.Blocked:
      return Colors.stateBlocked;
    case TaskState.Cancelled:
      return Colors.stateCancelled;
    case TaskState.Done:
      return Colors.stateDone;
    case TaskState.Duplicate:
      return Colors.stateDuplicate;
    case TaskState.InProgress:
      return Colors.stateInProgress;
    case TaskState.Paused:
      return Colors.statePaused;
    default:
      return Colors.stateTodo;
  }
};
export const getPaymentStatusColor = status => {
  switch (status) {
    case PaymentStatus.Approved:
      return Colors.success;
    case PaymentStatus.Canceled:
      return Colors.danger;
    case PaymentStatus.WaitForApprove:
      return Colors.warning;
  }
};
export const getInputHeight = numberOfLines => {
  return numberOfLines > 1 && Platform.OS === "ios"
    ? { minHeight: 20 * numberOfLines + 30 }
    : null;
};
export const makeArray = obj => {
  return obj instanceof Array ? obj : [obj];
};
