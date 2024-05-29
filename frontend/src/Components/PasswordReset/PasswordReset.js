import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { message } from "react-message-popup";
import "./PasswordValidation.css";
function ResetPassword({ toggleForm }) {
  const [formData, setFormData] = useState({
    reset_token: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    reset_token: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (formData.reset_token.length !== 6) {
      message.error("Der Rücksetzcode ist ungültig.", 2000);
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "* Passwort darf nicht leer sein";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "* Passwort ist zu kurz";
      valid = false;
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword =
        "* Passwort muss mindestens einen Großbuchstaben enthalten";
      valid = false;
    } else if (!/\d/.test(formData.newPassword)) {
      newErrors.newPassword = "* Passwort muss mindestens eine Zahl enthalten";
      valid = false;
    } else if (!/[^a-zA-Z0-9]/.test(formData.newPassword)) {
      newErrors.newPassword =
        "* Passwort muss mindestens ein Sonderzeichen enthalten";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("https://api.mwerr.de/api/v1/Passwords", {
        method: "PUT",
        headers: {
          accept: "*/*",
          "x-api-key": "keyTest",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 204) {
        message.success("Passwort wurde erfolgreich zurückgesetzt", 2000);
      } else {
        message.error("Ein Fehler ist aufgetreten", 2000);
      }
    } catch (error) {
      message.error(
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        2000
      );
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Passwort Rücksetzen</h1>
        <div className="input-box">
          <input
            type="text"
            name="reset_token"
            placeholder="Rücksetzcode"
            value={formData.reset_token}
            onChange={handleChange}
          />
          <CiUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Neues Passwort"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <CiLock
            className="password-icon icon"
            onClick={togglePasswordVisibility}
          />
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        </div>
        <div className="reset">
          <a href="/login">Zurück zum Login</a>
          <a href="/forgotPassword">Ich habe kein Code</a>
        </div>
        <button type="submit" className="submit-button">
          Rücksetzen
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
