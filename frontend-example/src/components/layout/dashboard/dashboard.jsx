import React from "react";
import { Redirect, Switch } from "react-router";

import { ProtectedRoute } from "../../common";
import routes from "../../../routes";
import "./dashboard.scss";
import EditAccountPage from "../../pages/edit-account";
import DashboardPage from "../../pages/dashboard/dashboard";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__page">
        <Switch>
          <ProtectedRoute
            component={DashboardPage}
            path={routes.dashboard.root}
            exact
          />
          <ProtectedRoute
            component={EditAccountPage}
            path={routes.dashboard.editAccount}
            exact
          />
          <Redirect to={routes.dashboard.root} />
        </Switch>
      </div>
    </div>
  );
};

export default DashboardLayout;
