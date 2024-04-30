import React, { useState } from "react";
import "./LoginForm.css";
import { CiUser, CiLock } from "react-icons/ci";
import LoginRequest from "./LoginRequest";

function LoginForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
    LoginRequest(formData);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Anmelden</h1>
        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            value={formData.username}
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
          />{" "}
        </div>
        <div className="forgot">
          <a href="resetPassword">Passwort vergessen?</a>
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
