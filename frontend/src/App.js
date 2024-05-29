import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import ResetPassword from "./Components/PasswordReset/PasswordReset";
import ForgotPassword from "./Components/PasswordReset/ForgotPassword";
import EmployeeVacantionDashboard from "./Components/Dashboards/EmployeeVacantionDashboard";
import AdminVacantionDashboard from "./Components/Dashboards/AdminVacantionDashboard";
import AdminRegisterDashboard from "./Components/Dashboards/AdminRegisterDashboard";
import EmployeeRequestsDashboard from "./Components/Dashboards/EmployeeRequestsDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/employee" element={<EmployeeVacantionDashboard />} />
        <Route path="/urlaubsantraege" element={<AdminVacantionDashboard />} />
        <Route
          path="/registrierungsantraege"
          element={<AdminRegisterDashboard />}
        />
        <Route path="/antraege" element={<EmployeeRequestsDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
