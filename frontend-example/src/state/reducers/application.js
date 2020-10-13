import { createReducer } from "redux-promise-middleware-actions";
import { applicationActions } from "../actions";

export default createReducer(
  {
    loaded: false,
  },
  (handleAction) => [
    handleAction(applicationActions.load.pending, (state) => ({
      ...state,
      pending: true,
    })),
    handleAction(applicationActions.load.fulfilled, (state, { payload }) => ({
      ...state,
      pending: false,
      loaded: true,
      data: payload,
    })),
    handleAction(applicationActions.load.rejected, (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload,
    })),
    handleAction(applicationActions.login.pending, (state) => ({
      ...state,
      pending: true,
    })),
    handleAction(applicationActions.login.fulfilled, (state, { payload }) => ({
      ...state,
      pending: false,
      data: payload,
    })),
    handleAction(applicationActions.login.rejected, (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload,
    })),
    handleAction(applicationActions.logout.pending, (state) => ({
      ...state,
      pending: true,
    })),
    handleAction(applicationActions.logout.fulfilled, (state, { payload }) => ({
      ...state,
      pending: false,
      data: payload,
    })),
    handleAction(applicationActions.logout.rejected, (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload,
    })),
  ]
);
