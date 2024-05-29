import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";

function ResetPassword({ toggleForm }) {
  const [formData, setFormData] = useState({
    reset_token: "",
    newPassword: "",
  });
  const [error] = useState(null);

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

  const handleSubmit = () => {};

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Passwort Rücksetzen</h1>
        {error && <p className="error">{error}</p>}
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
          />{" "}
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
