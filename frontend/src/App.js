import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import Home from "./Components/Home";
import Employee from "./Components/Roles/Employee";
import TripleTable from "./Components/Roles/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/adminDashboard" element={<TripleTable />} />
      </Routes>
    </Router>
  );
};

export default App;
