import React, { useState } from "react";
import { CiUser, CiMenuBurger } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import "./HeaderBar.css";

const AdminHeaderBar = ({ title }) => {
  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionsMenu = () => {
    setOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const handleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleAdminOption = (option) => {
    switch (option) {
      case "profile":
        navigate("/my-profile");
        break;
      case "register":
        navigate("/registration-requests");
        break;
      case "vacation":
        navigate("/vacation-requests");
        break;
      case "provision":
        navigate("/provisioning-requests");
        break;
      case "logout":
        message.success("You have been logged out", 1500);
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
              <button onClick={() => handleAdminOption("register")}>
                Registrierungsanträge
              </button>
              <button onClick={() => handleAdminOption("vacation")}>
                Urlaubsanträge
              </button>
              <button onClick={() => handleAdminOption("provision")}>
                Provisionierungsanträge
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
                <button onClick={() => handleAdminOption("profile")}>
                  Profil
                </button>
                <button onClick={() => handleAdminOption("logout")}>
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

export default AdminHeaderBar;
