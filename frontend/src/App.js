import React, { useState } from "react";
import AuthContainer from "./AuthContainer";
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
      <AuthContainer>
        {showLoginForm ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <RegistrationForm toggleForm={toggleForm} />
        )}
      </AuthContainer>
    </div>
  );
}

export default App;
