import React, { useState, useEffect } from "react";
import "./Menu.css";
import codesandbox from "../../assets/codesandbox.png";
import { FiLayout, FiDatabase, FiSettings } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import Logout from "../Logout/Logout";

const Menu = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("/");
  const [logoutForm, setLogoutForm] = useState(false);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);
  return (
    <div className="menu">
      <div>
        <div className="menu-title">
          <img src={codesandbox} alt="Code Sandbox" />
          <p>Pro Manage</p>
        </div>
        <div
          className={activeMenu === "/" ? "menu-item menu-active" : "menu-item"}
        >
          <i>
            <FiLayout />
          </i>
          <Link
            to="/"
            className={activeMenu === "/" ? "link-active" : "link-title"}
          >
            Board
          </Link>
        </div>
        <div
          className={
            activeMenu === "/analytics" ? "menu-item menu-active" : "menu-item"
          }
        >
          <i>
            <FiDatabase />
          </i>
          <Link
            to="/analytics"
            className={
              activeMenu === "/analytics" ? "link-active" : "link-title"
            }
          >
            Analytics
          </Link>
        </div>
        <div
          className={
            activeMenu === "/settings" ? "menu-item menu-active" : "menu-item"
          }
        >
          <i>
            <FiSettings />
          </i>
          <Link
            to="/settings"
            className={
              activeMenu === "/settings" ? "link-active" : "link-title"
            }
          >
            settings
          </Link>
        </div>
      </div>
      <div className="menu-logout" onClick={() => setLogoutForm(!logoutForm)}>
        <i>
          <TbLogout />
        </i>
        <p>Log out</p>
      </div>
      {logoutForm && <Logout onClose={() => setLogoutForm(!logoutForm)} />}
    </div>
  );
};

export default Menu;
