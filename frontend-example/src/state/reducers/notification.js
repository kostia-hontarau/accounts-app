import { createReducer } from "redux-promise-middleware-actions";
import cloneDeep from "lodash/cloneDeep";
import { notificationActions } from "../actions";
import notificationsConfig from "../notifications-config";
import {
  actionType as actionTypeEnum,
  asyncActionState as asyncActionStateEnum,
} from "../constants";
import actionTypeHelpers from "../helpers/action-type";
import ClientFriendlyError from "../models/client-friendly-error";

const notificationActionTypesArray = [
  actionTypeEnum.SHOW_NOTIFICATION,
  actionTypeEnum.RESET_NOTIFICATION,
];

const getNotifiableActionTypes = (asyncActionState) =>
  actionTypeHelpers
    .getActionTypesFullNames(asyncActionState)
    .filter(
      (actionTypeFullName) =>
        !notificationActionTypesArray.some((notificationActionType) =>
          actionTypeFullName.includes(notificationActionType)
        )
    );

const initialState = {
  data: { notification: null },
};

export default createReducer(initialState, (handleAction) => [
  handleAction(notificationActions.show, (state, { payload }) => ({
    data: { notification: payload.notification },
  })),
  handleAction(notificationActions.reset, () => ({
    data: { notification: null },
  })),
  ...getNotifiableActionTypes([asyncActionStateEnum.FULFILLED]).map(
    (actionType) =>
      handleAction(actionType, () => {
        const notification = notificationsConfig.get(actionType);
        return {
          data: {
            notification: notification ? { ...notification } : null,
          },
        };
      })
  ),
  ...getNotifiableActionTypes([asyncActionStateEnum.REJECTED]).map(
    (actionType) => {
      return handleAction(actionType, (state, { payload: error }) => {
        let notification = notificationsConfig.get(actionType);

        if (notification) {
          if (error instanceof ClientFriendlyError) {
            notification = cloneDeep(notification);
            notification.description = error.message;
            if (error.requestId) {
              notification.description = `${notification.description} (RequestId: ${error.requestId})`;
            }
          }
        }

        return {
          data: {
            notification: notification ? { ...notification } : null,
          },
        };
      });
    }
  ),
]);
