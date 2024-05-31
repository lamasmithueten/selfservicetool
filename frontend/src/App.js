import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import ResetPassword from "./Components/PasswordReset/PasswordReset";
import ForgotPassword from "./Components/PasswordReset/ForgotPassword";
import AdminProvisioningDashboard from "./Components/Dashboards/Provisioning/AdminProvisioningDashboard";
import AvailableVMs from "./Components/Dashboards/Provisioning/AvailableVMs";
import EmployeeRequestVM from "./Components/Dashboards/Provisioning/EmployeeRequestVM";
import EmployeeVMRequests from "./Components/Dashboards/Provisioning/EmployeeVMRequests";
import AdminRegisterDashboard from "./Components/Dashboards/Vacation/AdminRegisterDashboard";
import AdminVacationDashboard from "./Components/Dashboards/Vacation/AdminVacantionDashboard";
import EmployeeRequestVacation from "./Components/Dashboards/Vacation/EmployeeRequestVacation";
import EmployeeVacationRequests from "./Components/Dashboards/Vacation/EmployeeVacationRequests";
import UserProfile from "./Components/UserProfile/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        {/*general routes*/}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/my-profile" element={<UserProfile />} />

        {/*employee routes*/}
        <Route
          path="/vacation-request/new"
          element={<EmployeeRequestVacation />}
        />
        <Route
          path="/provisioning-request/new"
          element={<EmployeeRequestVM />}
        />
        <Route
          path="/my-vacation-requests"
          element={<EmployeeVacationRequests />}
        />
        <Route
          path="/my-provisioning-requests"
          element={<EmployeeVMRequests />}
        />
        <Route path="/my-environments" element={<AvailableVMs />} />
        {/*admin routes*/}
        <Route path="/vacation-requests" element={<AdminVacationDashboard />} />
        <Route
          path="/registration-requests"
          element={<AdminRegisterDashboard />}
        />
        <Route
          path="/provisioning-requests"
          element={<AdminProvisioningDashboard />}
        />
      </Routes>
    </Router>
  );
};

export default App;
