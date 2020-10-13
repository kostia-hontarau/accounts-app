import PropTypes from "prop-types";

export default PropTypes.shape({
  surname: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  city: PropTypes.string,
  postalCode: PropTypes.string,
  phone: PropTypes.string,
});
