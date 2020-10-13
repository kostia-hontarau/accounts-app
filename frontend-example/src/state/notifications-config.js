import Notification from "./models/notification";
import actionTypeHelpers from "./helpers/action-type";
import { actionType, asyncActionState } from "./constants";

const defaultSuccessNotification = new Notification({
  title: "Success",
  description: "The operation completed.",
  type: "success",
  config: {
    placement: "topLeft",
    duration: 3,
  },
});

const defaultErrorNotification = new Notification({
  title: "Error",
  description: "The operation has not completed.",
  type: "error",
  config: {
    placement: "topLeft",
    duration: 0,
  },
});

export default new Map([
  [
    actionTypeHelpers.getActionTypeFullName(
      actionType.LOGIN,
      asyncActionState.FULFILLED
    ),
    defaultSuccessNotification,
  ],
  [
    actionTypeHelpers.getActionTypeFullName(
      actionType.LOGIN,
      asyncActionState.REJECTED
    ),
    defaultErrorNotification,
  ],
  [
    actionTypeHelpers.getActionTypeFullName(
      actionType.REGISTER_ACCOUNT,
      asyncActionState.FULFILLED
    ),
    defaultSuccessNotification,
  ],
  [
    actionTypeHelpers.getActionTypeFullName(
      actionType.REGISTER_ACCOUNT,
      asyncActionState.REJECTED
    ),
    defaultErrorNotification,
  ],
  [
    actionTypeHelpers.getActionTypeFullName(
      actionType.UPDATE_ACCOUNT,
      asyncActionState.FULFILLED
    ),
    defaultSuccessNotification,
  ],
  [
    actionTypeHelpers.getActionTypeFullName(
      actionType.UPDATE_ACCOUNT,
      asyncActionState.REJECTED
    ),
    defaultErrorNotification,
  ],
]);
