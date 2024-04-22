// App.js
import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import "./App.css"; // Import the CSS file for styling

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="App">
      <h1>Welcome</h1>
      <div className="login-container">
        {showLoginForm ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <RegistrationForm toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}

export default App;
