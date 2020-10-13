import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginForm from "./login-form";
import { applicationActions } from "../../../state/actions";
import { handleActionError } from "../../../state/helpers/action-handling";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  const boundApplicationActions = bindActionCreators(
    applicationActions,
    dispatch
  );

  return {
    onLogin: handleActionError(boundApplicationActions.login),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
