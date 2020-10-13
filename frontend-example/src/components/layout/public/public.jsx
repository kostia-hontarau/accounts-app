import React from "react";
import { Route, Switch, Redirect } from "react-router";

import LoginPage from "../../pages/login";
import NotFoundPage from "../../pages/not-found";
import HomePage from "../../pages/home";

import routes from "../../../routes";
import "./public.scss";
import RegistrationPage from "../../pages/registration";

const PublicLayout = () => (
  <div className="public-layout">
    <div className="public-layout__page">
      <Switch>
        <Route component={LoginPage} path={routes.public.login} exact />
        <Route component={HomePage} path={routes.public.home} exact />
        <Route
          component={RegistrationPage}
          path={routes.public.register}
          exact
        />
        <Redirect from={routes.public.root} to={routes.public.home} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </div>
);

export default PublicLayout;
