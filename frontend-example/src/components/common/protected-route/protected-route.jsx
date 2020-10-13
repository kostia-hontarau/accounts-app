import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import routes from "../../../routes";
import accountPropTypes from "../prop-types/account";

const ProtectedRoute = ({ isAuthenticated, location, account, ...rest }) => {
  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: routes.public.login,
          state: { from: location },
        }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} />;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  account: accountPropTypes,
  location: PropTypes.shape({}).isRequired,
};

ProtectedRoute.defaultProps = {
  account: null,
};

export default ProtectedRoute;
