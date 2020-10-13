import { compose } from "recompose";
import { connect } from "react-redux";

import { withRouter } from "react-router";

import LoginPage from "./login";

const mapStateToProps = (state) => {
  const { data, error } = state.application;
  return {
    isAuthenticated: data ? Boolean(data.account) : false,
    error,
  };
};

export default compose(connect(mapStateToProps), withRouter)(LoginPage);
