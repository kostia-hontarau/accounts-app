import { createAsyncAction } from "redux-promise-middleware-actions";
import accountApi from "../../modules/account-api";
import { actionType } from "../constants";

const load = createAsyncAction(actionType.LOAD, accountApi.session);
const login = createAsyncAction(actionType.LOGIN, accountApi.login);
const logout = createAsyncAction(actionType.LOGOUT, accountApi.logout);

export default {
  load,
  login,
  logout,
};
