import React, { useState } from "react";

function LoginForm({ toggleForm }) {
  const [formData, setFormData] = useState({
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
        Login
      </button>
      <div>
        Don't have an account?{" "}
        <a href="#" onClick={toggleForm}>
          Register here
        </a>
        .
      </div>
    </form>
  );
}

export default LoginForm;
