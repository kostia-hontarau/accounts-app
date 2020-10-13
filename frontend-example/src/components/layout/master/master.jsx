import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Switch, Route } from "react-router";
import { Layout, Spin } from "antd";

import { showNotification, ProtectedRoute, Header, Footer } from "../../common";

import DashboardLayout from "../dashboard";
import PublicLayout from "../public";
import notificationPropTypes from "../../common/prop-types/notification";
import routes from "../../../routes";
import "./master.scss";

const MasterLayout = ({ onLoad, pending, notification }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useEffect(() => {
    if (notification) {
      showNotification(notification);
    }
  }, [notification]);

  return (
    <Layout className="master-layout">
      <Layout.Header className="master-layout__header">
        <Header />
      </Layout.Header>

      <Layout.Content className="master-layout__content">
        {pending ? (
          <Spin
            spinning={pending}
            delay={500}
            className="master-layout__spinner"
          />
        ) : (
          <Switch>
            <ProtectedRoute
              component={DashboardLayout}
              path={routes.dashboard.root}
            />
            <Route component={PublicLayout} />
          </Switch>
        )}
      </Layout.Content>

      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};

MasterLayout.propTypes = {
  onLoad: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  notification: notificationPropTypes,
};

MasterLayout.defaultProps = {
  notification: null,
};

export default MasterLayout;
