import React, { useState } from "react";
import "./LoginForm.css";
import { CiUser, CiLock } from "react-icons/ci";
import loginValidation from "./LoginValidation";
import { useHistory } from "react-router-dom"; // Import useHistory hook

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

  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call loginValidation function to check credentials
    const loginResult = await loginValidation(
      formData.username,
      formData.password
    );

    //Backendsache, das ist nur zum testen
    if (loginResult === "success") {
      // Login successful
      console.log("Login successful!");
      window.location.href = "/home";
      // You can add additional logic here, like redirecting to another page
    } else if (loginResult === "username incorrect") {
      console.log("Username incorrect");
    } else if (loginResult === "password incorrect") {
      console.log("Password incorrect");
    } else {
      console.log("Error:", loginResult);
    }
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
            value={formData.email}
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
