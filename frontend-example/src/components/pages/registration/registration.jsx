import React from "react";
import PropTypes from "prop-types";
import RegistrationForm from "./registration-form";

import "./registration.scss";
import routes from "../../../routes";

const RegistrationPage = ({ onRegister, history }) => {
  const register = (formData) => {
    onRegister(formData).then((result) => {
      if (!(result instanceof Error)) {
        history.push(routes.public.login);
      }
    });
  };

  return (
    <div className="registration-page">
      <div className="registration-page__inner-container">
        <div className="registration-page__title-container">
          <h1>Registration page</h1>
        </div>
        <div className="registration-page__form-container">
          <RegistrationForm onRegister={register} />
        </div>
      </div>
    </div>
  );
};

RegistrationPage.propTypes = {
  onRegister: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default RegistrationPage;
