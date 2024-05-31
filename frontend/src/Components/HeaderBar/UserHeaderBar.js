import React, { useState } from "react";
import { CiUser, CiMenuBurger } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import "./HeaderBar.css";
import "../Dashboards/Dashboard.css";

const UserHeaderBar = ({ title }) => {
  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionsMenu = () => {
    setOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const handleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserOption = (option) => {
    switch (option) {
      case "profile":
        navigate("/my-profile");
        break;
      case "vacation":
        navigate("/my-vacation-requests");
        break;
      case "vacation-new":
        navigate("/vacation-request/new");
        break;
      case "provision":
        navigate("/my-provisioning-requests");
        break;
      case "provision-new":
        navigate("/provisioning-request/new");
        break;
      case "environments":
        navigate("/my-environments");
        break;
      case "logout":
        message.success("Sie wurden ausgelogt", 1500);
        localStorage.removeItem("token");
        navigate("/login");
        break;
      default:
        break;
    }
    setUserMenuOpen(false);
  };

  return (
    <div className="header-bar">
      <div className="left-buttons">
        <button className="first-button" onClick={handleOptionsMenu}>
          <CiMenuBurger />
        </button>
        {isOptionsMenuOpen && (
          <div className="settings-dropdown-menu">
            <>
              <button onClick={() => handleUserOption("vacation")}>
                Urlaubsanträge
              </button>
              <button onClick={() => handleUserOption("vacation-new")}>
                Urlaub beantragen
              </button>
              <button onClick={() => handleUserOption("provision")}>
                Umgebungsanträge
              </button>
              <button onClick={() => handleUserOption("provision-new")}>
                Umgebung beantragen
              </button>
              <button onClick={() => handleUserOption("environments")}>
                Meine Umgebungen
              </button>
            </>
          </div>
        )}
      </div>
      <div className="title-container">
        <h1>{title}</h1>
      </div>
      <div className="right-buttons">
        <button className="second-button" onClick={handleUserMenu}>
          <CiUser />
          {isUserMenuOpen && (
            <div className="user-dropdown-menu">
              <>
                <button onClick={() => handleUserOption("profile")}>
                  Profil
                </button>
                <button onClick={() => handleUserOption("logout")}>
                  Logout
                </button>
              </>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserHeaderBar;
