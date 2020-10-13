import { createAction } from "redux-promise-middleware-actions";
import { actionType } from "../constants";

const show = createAction(actionType.SHOW_NOTIFICATION, (notification) => ({
  notification,
}));

const reset = createAction(actionType.RESET_NOTIFICATION);

export default {
  show,
  reset,
};
