import React, { useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { message } from "react-message-popup";
import "./RegisterForm.css";
import { validateForm } from "./RegisterValidation";

function RegistrationForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
      message.error("Bitte füllen Sie alle Felder richtig aus", 2000);
      return;
    }

    try {
      const headers = {
        accept: "*/*",
        "x-api-key": "keyTest",
        "Content-Type": "application/json",
      };

      const response = await fetch("https://api.mwerr.de/api/v1/Users", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (response.status === 204) {
        message.success("Registrierungsantrag erfolgreich gesendet", 2000);
        setFormData({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          role: "employee",
        });
        setFormErrors({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          role: "",
        });
      } else if (response.status === 409) {
        message.error("Benutzername oder E-Mail bereits registriert", 2000);
      }
    } catch (error) {
      message.error("Fehler bei der Registrierung", 2000);
    }
  };

  return (
    <div className="wrapper">
      <h1>Registrieren</h1>
      <form onSubmit={handleSubmit}>
        <div className="names">
          <div
            className={`input-box ${formErrors.firstname && "error-message"}`}
          >
            <input
              type="text"
              name="firstname"
              placeholder="Vorname"
              value={formData.firstname}
              onChange={handleChange}
              maxLength={50}
            />
            <CiUser className="icon" />
            {formErrors.firstname && (
              <p className="error-message">{formErrors.firstname}</p>
            )}
          </div>
          <div
            className={`input-box ${formErrors.lastname && "error-message"}`}
          >
            <input
              type="text"
              name="lastname"
              placeholder="Nachname"
              value={formData.lastname}
              onChange={handleChange}
              maxLength={50}
            />
            <CiUser className="icon" />
            {formErrors.lastname && (
              <p className="error-message">{formErrors.lastname}</p>
            )}
          </div>
        </div>
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
            type={showPassword ? "text" : "password"}
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
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        <div className="role">
          <label>
            <input
              type="radio"
              value="employee"
              name="role"
              onChange={handleChange}
              defaultChecked
            />
            Mitarbeiter
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              name="role"
              onChange={handleChange}
            />
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
