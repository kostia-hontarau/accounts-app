import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import * as redirectUrlHelpers from "./redirect-url-helpers";

import "./login.scss";
import LoginForm from "../../common/login-form";

const setProtectedReturnUrl = (location, history) => {
  const protectedReturnUrl = redirectUrlHelpers.getProtectedReturnUrl(location);

  if (protectedReturnUrl) {
    history.push({
      search: `?returnUrl=${protectedReturnUrl}`,
    });
  }
};

const LoginPage = ({ isAuthenticated, location, history }) => {
  useEffect(() => setProtectedReturnUrl(location, history), [
    history,
    location,
  ]);

  if (isAuthenticated) {
    return <Redirect to={redirectUrlHelpers.getRedirectUrl(location)} />;
  }

  return (
    <div className="login-page">
      <div className="login-page__inner-container">
        <div className="login-page__title-container">
          <h1>Login page</h1>
        </div>
        <div className="login-page__form-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginPage;
