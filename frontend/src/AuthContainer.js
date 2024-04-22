import React from "react";
import "./App.css"; // Import the CSS file for styling

const AuthContainer = ({ children }) => {
  return (
    <div className="auth-container">
      <h1 className="welcome-text">Welcome</h1>
      {children}
    </div>
  );
};

export default AuthContainer;
