import React, { useState } from "react";
import { CiUser } from "react-icons/ci";

function ForgotPassword({ toggleForm }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {};

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Passwort Rücksetzen</h1>
        <p className="reset-info">
          Gib deine E-Mail-Adresse ein, mit der du dich registriert hast. Wir
          senden dir einen Code zum Zurücksetzen des Passworts.
        </p>
        {error && <p className="error">{error}</p>}
        <div className="input-box">
          <input
            type="text"
            name="email"
            placeholder="E-Mail"
            value={formData.usernameOrEmail}
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
