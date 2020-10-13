import { connect } from "react-redux";

import ProtectedRoute from "./protected-route";

const mapStateToProps = (state) => {
  const { data } = state.application;
  const account = data ? data.account : null;
  return {
    isAuthenticated: Boolean(account),
    account,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
