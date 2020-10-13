import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { Route } from "react-router";

import routes from "./routes";
import createStore from "./state/create-store";
import MasterLayout from "./components/layout/master";

import "antd/dist/antd.css";

const history = createBrowserHistory();

const App = () => (
  <Provider store={createStore(history)}>
    <ConnectedRouter history={history}>
      <Route path={routes.root} component={MasterLayout} />
    </ConnectedRouter>
  </Provider>
);

export default App;
