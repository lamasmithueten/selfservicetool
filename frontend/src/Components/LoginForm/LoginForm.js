import React, { useState } from "react";
import "./LoginForm.css";
import { CiUser, CiLock } from "react-icons/ci";
import LoginRequest from "./LoginRequest";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios";

function LoginForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error] = useState(null); // State to store login error
  const navigate = useNavigate(); // Initialize navigate

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
    const token = await LoginRequest(formData);
    localStorage.setItem("token", token);
    if (token != null) {
      const userResponse = await axios.get("https://api.mwerr.de/api/v1/User", {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "x-api-key": "keyTest",
        },
      });
      if(userResponse.data.role === "admin") {
        navigate("/adminDashboard"); 
      } else {
        navigate("/employee"); 
      }
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
