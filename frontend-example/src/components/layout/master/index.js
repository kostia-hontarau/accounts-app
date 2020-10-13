import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleActionError } from "../../../state/helpers/action-handling";
import { applicationActions } from "../../../state/actions";

import MasterLayout from "./master";

const mapStateToProps = (state) => {
  const applicationState = state.application;
  const { notification } = state.notification.data;

  return {
    pending: applicationState.pending || !applicationState.loaded,
    notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  const boundApplicationActions = bindActionCreators(
    applicationActions,
    dispatch
  );

  return {
    onLoad: handleActionError(boundApplicationActions.load),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterLayout);
