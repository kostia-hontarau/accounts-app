import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import * as reducers from "./reducers";

export default (history) => {
  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  });
  /* eslint-disable no-underscore-dangle */
  const enhancer = compose(
    applyMiddleware(thunk, promiseMiddleware, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  );
  /* eslint-enable no-underscore-dangle */

  return createStore(rootReducer, {}, enhancer);
};
