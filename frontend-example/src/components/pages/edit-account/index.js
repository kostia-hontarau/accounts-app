import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import EditAccountPage from "./edit-account";

import { accountActions, applicationActions } from "../../../state/actions";
import { handleActionError } from "../../../state/helpers/action-handling";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  const boundAccountActions = bindActionCreators(accountActions, dispatch);
  const boundApplicationActions = bindActionCreators(
    applicationActions,
    dispatch
  );

  return {
    onUpdateAccount: handleActionError(boundAccountActions.updateAccount),
    onLoad: handleActionError(boundApplicationActions.load),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(EditAccountPage);
