// RegistrationForm.js
import React, { useState } from "react";

function RegistrationForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., validation, API call)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input-field"
      />
      <button type="submit" className="submit-button">
        Register
      </button>
      <div>
        Already have an account?{" "}
        <a href="#" onClick={toggleForm}>
          Login here
        </a>
        .
      </div>
    </form>
  );
}

export default RegistrationForm;
