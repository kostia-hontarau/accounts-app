import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import RegistrationPage from "./registration";

import { accountActions } from "../../../state/actions";
import { handleActionError } from "../../../state/helpers/action-handling";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  const boundAccountActions = bindActionCreators(accountActions, dispatch);

  return {
    onRegister: handleActionError(boundAccountActions.register),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(RegistrationPage);
