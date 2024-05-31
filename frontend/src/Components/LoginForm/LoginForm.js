import React, { useState } from "react";
import { CiLock, CiUser } from "react-icons/ci";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import LoginRequest from "./LoginRequest";

function LoginForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await LoginRequest(formData);
      if (token) {
        localStorage.setItem("token", token);

        const response = await fetch("https://api.mwerr.de/api/v1/Users", {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "x-api-key": "keyTest",
          },
        });

        const userData = await response.json();
        if (userData.role === "admin") {
          navigate("/vacation-requests");
        } else {
          navigate("/my-vacation-requests");
        }
      }
    } catch (error) {
      message.error(
        "Ein Fehler ist aufgetreten, bitte versuchen Sie erneut.",
        2000
      );
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Anmelden</h1>
        {error && <p className="error">{error}</p>}
        <div className="input-box">
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Benutzername / E-Mail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
          />
          <CiUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Passwort"
            value={formData.password}
            onChange={handleChange}
          />
          <CiLock
            className="password-icon icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className="forgot">
          <a href="forgotPassword">Passwort vergessen?</a>
        </div>
        <button type="submit" className="submit-button">
          Anmelden
        </button>
        <div className="register-link">
          <p>
            Noch nicht registriert? <a href="register">Registrieren</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
