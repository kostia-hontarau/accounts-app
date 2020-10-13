import React from "react";
import PropTypes from "prop-types";

const HomePage = ({ isAuthenticated }) => {
  return (
    <div>
      Welcome to account management app example!
      {!isAuthenticated && <p> Please, log in or register!</p>}
    </div>
  );
};

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomePage;
