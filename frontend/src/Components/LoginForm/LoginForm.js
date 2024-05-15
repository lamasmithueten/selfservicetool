import React, { useState } from "react";
import "./LoginForm.css";
import { CiUser, CiLock } from "react-icons/ci";
import LoginRequest from "./LoginRequest";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function LoginForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState(null); // State to store login error
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
    try {
      const token = await LoginRequest(formData); // Await for login request
      // Save token to local storage or session storage
      localStorage.setItem("token", token); // Save token to local storage
      navigate("/adminDashboard"); // Redirect to adminDashboard
    } catch (error) {
      setError("Invalid username or password."); // Set error message if login fails
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Anmelden</h1>
        {error && <p className="error">{error}</p>} {/* Display error message */}
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
