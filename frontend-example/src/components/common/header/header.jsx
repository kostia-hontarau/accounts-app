import React from "react";
import PropTypes from "prop-types";
import {
  HomeFilled,
  LoginOutlined,
  AccountBookFilled,
  DashboardFilled,
  LogoutOutlined,
  EditFilled,
} from "@ant-design/icons";
import accountPropTypes from "../prop-types/account";

import "./header.scss";
import logo from "../../../assets/images/logo.svg";
import routes from "../../../routes";
import MenuItem from "./menu-item";

const Header = ({ account, onLogout }) => {
  return (
    <div className="header">
      <div className="header__inner-container">
        <div className="header__logo-container">
          <img src={logo} className="header__logo" alt="Logo" />
        </div>
        {account && (
          <div className="header__menu-container">
            <div className="header__greeting-container">
              <div className="header__greeting">{`Welcome ${account.name}!`}</div>
            </div>

            <div className="header__index-container">
              <MenuItem to={routes.public.home} Icon={HomeFilled} text="Home" />
              <MenuItem
                to={routes.dashboard.root}
                Icon={DashboardFilled}
                text="Dashboard"
              />
              <MenuItem
                to={routes.dashboard.editAccount}
                Icon={EditFilled}
                text="Edit Account"
              />
              <MenuItem
                Icon={LogoutOutlined}
                text="Log Out"
                onClick={() => onLogout()}
              />
            </div>
          </div>
        )}
        {!account && (
          <div className="header__menu-container">
            <div className="header__index-container">
              <MenuItem to={routes.public.home} Icon={HomeFilled} text="Home" />
              <MenuItem
                to={routes.public.register}
                Icon={AccountBookFilled}
                text="Register"
              />
              <MenuItem
                to={routes.public.login}
                Icon={LoginOutlined}
                text="Log In"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  account: accountPropTypes,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  account: null,
};

export default Header;
