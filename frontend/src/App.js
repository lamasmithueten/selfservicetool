import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import Home from "./Components/Home";
import Calendar from "./Components/Roles/Employee2";
import AdminUrlaubDashboard from "./Components/Roles/Admin";
import AdminRegisterDashboard from "./Components/Roles/RegisterAntrag"
import EmployeeDashboard from "./Components/Roles/EmployeeDashboard"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={<Calendar />} />
        <Route path="/urlaubsantraege" element={<AdminUrlaubDashboard />} />
        <Route path="/registrierungsantraege" element={<AdminRegisterDashboard />} />
        <Route path="/antraege" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
