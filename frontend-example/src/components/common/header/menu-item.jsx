import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Link } from "react-router-dom";

import "./menu-item.scss";

const MenuItem = ({ to, Icon, text, onClick }) => (
  <Link to={to || "#"} className="menu-item" onClick={onClick}>
    <Button className="menu-item__button" type="primary">
      <Icon className="menu-item__icon" />
      <span className="menu-item__text">{text}</span>
    </Button>
  </Link>
);

MenuItem.propTypes = {
  to: PropTypes.string,
  Icon: PropTypes.shape({}),
  text: PropTypes.string,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  to: "#",
  Icon: null,
  text: null,
  onClick: null,
};

export default MenuItem;
