import { createAsyncAction } from "redux-promise-middleware-actions";
import accountApi from "../../modules/account-api";
import { actionType } from "../constants";

const register = createAsyncAction(
  actionType.REGISTER_ACCOUNT,
  accountApi.register
);

const updateAccount = createAsyncAction(
  actionType.UPDATE_ACCOUNT,
  accountApi.update
);

export default {
  register,
  updateAccount,
};
