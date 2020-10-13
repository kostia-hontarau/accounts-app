import PropTypes from "prop-types";

export default PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  config: PropTypes.shape({
    placement: PropTypes.string,
    duration: PropTypes.number,
  }),
});
