import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { message } from "react-message-popup";

function ForgotPassword({ toggleForm }) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "E-Mail darf nicht leer sein";
      message.error(newErrors.email, 2000);
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Ungültige Email-Adresse";
      message.error(newErrors.email, 2000);
    }

    // check if validation failed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setErrors({});

    const url = `https://api.mwerr.de/api/v1/Passwords?email=${encodeURIComponent(
      formData.email
    )}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "x-api-key": "keyTest",
        },
      });

      if (response.status === 204) {
        message.success("Der Code wurde gesendet", 2000);
      }
    } catch (error) {
      message.error("Es gab ein Fehler", 2000);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Passwort vergessen</h1>
        <p className="reset-info">
          Bitte geben Sie Ihre E-Mail Adresse an, mit welchen Sie registriert
          sind. Wir senden Ihnen einen Code zum Rücksetzung des Passworts.
          Beobachten Sie auch Ihr Spam Ordner bitte.
        </p>
        {errors.email && <p className="error">{errors.email}</p>}
        <div className="input-box">
          <input
            type="text"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleChange}
          />
          <CiUser className="icon" />
        </div>
        <div className="reset">
          <a href="/login">Zurück zum Login</a>
          <a href="/resetPassword">Ich habe den Code</a>
        </div>
        <button type="submit" className="submit-button">
          Passwort zurücksetzen
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
