import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import Home from "./Components/Home";
import Employee from "./Components/Roles/Employee";
import AdminUrlaubDashboard from "./Components/Roles/Admin";
import AdminRegisterDashboard from "./Components/Roles/RegisterAntrag"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/urlaubsantraege" element={<AdminUrlaubDashboard />} />
        <Route path="/registrierungsantraege" element={<AdminRegisterDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
