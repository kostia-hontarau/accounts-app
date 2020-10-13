import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "./header";
import { applicationActions } from "../../../state/actions";
import { handleActionError } from "../../../state/helpers/action-handling";

const mapStateToProps = (state) => ({
  account: state.application.data ? state.application.data.account : null,
});

const mapDispatchToProps = (dispatch) => {
  const boundApplicationActions = bindActionCreators(
    applicationActions,
    dispatch
  );

  return {
    onLogout: handleActionError(boundApplicationActions.logout),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
