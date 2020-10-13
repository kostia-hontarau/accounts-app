import { connect } from "react-redux";

import HomePage from "./home";

const mapStateToProps = (state) => {
  const applicationState = state.application;
  const account = applicationState.data ? applicationState.data.account : null;

  return {
    isAuthenticated: Boolean(account),
  };
};

export default connect(mapStateToProps)(HomePage);
