import React, { useState } from "react";
import { CiUser, CiLock, CiMail } from "react-icons/ci";
import "./RegisterForm.css";
import axios from "axios";
import { validateForm } from "./RegisterValidation";
import { message } from "react-message-popup";

function RegistrationForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Mitarbeiter",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData); // Validate form data
    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
      message.error("Ein Fehler ist bei der Registrierung aufgetreten", 4000);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/users",
        formData
      );
      console.log("User registered successfully:", response.data);
      message.success(
        "Registrierung ist erfolgreich, Sie können sich jetzt anmelden",
        4000
      );

      // Reset form data and errors
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "Mitarbeiter",
      });
      setFormErrors({
        username: "",
        email: "",
        password: "",
        role: "Mitarbeiter",
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="wrapper">
      <h1>Registrieren</h1>
      <form onSubmit={handleSubmit} className="">
        <div className={`input-box ${formErrors.username && "error-message"}`}>
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            value={formData.username}
            onChange={handleChange}
            maxLength={100}
          />
          <CiUser className="icon" />
          {formErrors.username && (
            <p className="error-message">{formErrors.username}</p>
          )}
        </div>

        <div className={`input-box ${formErrors.email && "error-message"}`}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
          />
          <CiMail className="icon" />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>

        <div className={`input-box ${formErrors.password && "error-message"}`}>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            name="password"
            placeholder="Passwort"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            maxLength={100}
          />
          <CiLock
            className="password-icon icon"
            onClick={togglePasswordVisibility}
          />{" "}
          {/* Add onClick event to toggle password visibility */}
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>

        <div className="role">
          <label>
            <input
              type="radio"
              value="Mitarbeiter"
              name="role"
              onChange={handleChange}
              defaultChecked
            />{" "}
            Mitarbeiter
          </label>
          <label>
            <input
              type="radio"
              value="Management"
              name="role"
              onChange={handleChange}
            />{" "}
            Management
          </label>
        </div>
        <button type="submit" className="button">
          Registrieren
        </button>
        <div className="login-link">
          <p>
            Bereits registriert? <a href="login">Anmelden</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
