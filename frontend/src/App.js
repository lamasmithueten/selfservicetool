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
import AdminProvisioningDashboard from "./Components/Dashboards/Provisioning/AdminProvisioningDashboard";
import EmployeeProvisioningDashboard from "./Components/Dashboards/Provisioning/EmployeeProvisioningDashboard";
import EmployeeVMList from "./Components/Dashboards/Provisioning/EmployeeVMList";
import EmployeeVMRequest from "./Components/Dashboards/Provisioning/EmployeeVMRequest";
import UserProfile from "./Components/Dashboards/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/my-profile" element={<UserProfile />} />

        {/*employee routes*/}
        <Route
          path="/vacation-request/new"
          element={<EmployeeVacantionDashboard />}
        />
        <Route
          path="/provisioning-request/new"
          element={<EmployeeVMRequest />}
        />
        <Route
          path="/my-vacation-requests"
          element={<EmployeeRequestsDashboard />}
        />
        <Route
          path="/my-provisioning-requests"
          element={<EmployeeProvisioningDashboard />}
        />
        <Route path="/my-environments" element={<EmployeeVMList />} />
        {/*admin routes*/}
        <Route
          path="/vacantion-requests"
          element={<AdminVacantionDashboard />}
        />
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
