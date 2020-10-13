import { connect } from "react-redux";
import EditAccountForm from "./edit-account-form";

const mapStateToProps = (state) => ({
  account: state.application.data ? state.application.data.account : null,
});

export default connect(mapStateToProps)(EditAccountForm);
