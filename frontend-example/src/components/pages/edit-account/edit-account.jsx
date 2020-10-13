import React from "react";
import PropTypes from "prop-types";
import EditAccountForm from "./edit-account-form";
import "./edit-account.scss";
import routes from "../../../routes";

const EditAccountPage = ({ onUpdateAccount, onLoad, history }) => {
  const updateAccount = (formData) => {
    onUpdateAccount(formData).then((result) => {
      if (!(result instanceof Error)) {
        history.push(routes.dashboard.root);
        onLoad();
      }
    });
  };

  return (
    <div className="edit-account-page">
      <div className="edit-account-page__inner-container">
        <div className="edit-account-page__title-container">
          <h1>Edit Account page</h1>
        </div>
        <div className="edit-account-page__form-container">
          <EditAccountForm onUpdateAccount={updateAccount} />
        </div>
      </div>
    </div>
  );
};

EditAccountPage.propTypes = {
  onUpdateAccount: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditAccountPage;
