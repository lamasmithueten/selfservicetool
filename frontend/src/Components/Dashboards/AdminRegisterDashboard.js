import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminVacantionDashboard.css";
import { useNavigate } from "react-router-dom";
import "./AdminRegisterDashboard.css";
import { message } from "react-message-popup";
import { CiSettings } from "react-icons/ci";

const AdminRegisterDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [state, setState] = useState("accepted");
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-api-key": "keyTest",
      };
      const response = await axios.get(
        "https://api.mwerr.de/api/v1/RegistrationApplications",
        {
          headers: headers,
        }
      );

      setApplications(
        response.data.map((app) => ({
          username: app.username,
          role: app.role,
          email: app.email,
          firstname: app.firstname,
          lastname: app.lastname,
          application_date: app.application_date,
          id: app.id,
        }))
      );
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-api-key": "keyTest",
        "Content-Type": "application/json",
      };

      const requestBody = {
        id: applicationId,
        acceptOrDecline: state === "accepted" ? true : false,
        editRole: "employee",
      };

      const response = await axios.post(
        "https://api.mwerr.de/api/v1/RegistrationApplications",
        requestBody,
        {
          headers: headers,
        }
      );
      message.success("Anfrage wurde bearbeitet");
      console.log("Request successful:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error while sending POST request:", error);
    }
  };

  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  const handleOptionsMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserOption = (option) => {
    if (option === "register") {
      navigate("/registration-requests");
    } else if (option === "vacantion") {
      navigate("/vacantion-requests");
    } else if (option === "provision") {
      navigate("/provisioning-requests");
    } else if (option === "logout") {
      message.success("You have been logged out", 1500);
      localStorage.removeItem("token");
      navigate("/login");
    }
    setUserMenuOpen(false);
  };

  return (
    <div>
      <h1>Registrierungsanträge</h1>
      {error && <p>{error}</p>}
      <div
        className="admin-reg-dashboard"
        style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
      >
        <h2>Ausstehende Registrierungsanträge</h2>
        <table border="1" className="table">
          <thead>
            <tr>
              <th>Benutzername</th>
              <th>Rolle</th>
              <th>Email</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Antragsdatum</th>
              <th>Bearbeite</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td>{application.username}</td>
                <td>{application.role}</td>
                <td>{application.email}</td>
                <td>{application.firstname}</td>
                <td>{application.lastname}</td>
                <td>{application.application_date}</td>
                <td>
                  <select className="select" onChange={handleChangeState}>
                    <option className="select-items" value="accepted">
                      approve
                    </option>
                    <option value="declined">decline</option>
                  </select>
                </td>
                <td>
                  <button
                    className="send"
                    onClick={() => handleButtonClick(application.id)}
                  >
                    Send
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="first-button" onClick={handleOptionsMenu}>
        <CiSettings />
      </button>
      {isUserMenuOpen && (
        <div className="dropdown-menu">
          <>
            <button onClick={() => handleUserOption("register")}>
              Registrierungsanträge
            </button>
            <button onClick={() => handleUserOption("vacantion")}>
              Urlaubsanträge
            </button>
            <button onClick={() => handleUserOption("provision")}>
              Umgebungsanträge
            </button>
            <button onClick={() => handleUserOption("logout")}>Logout</button>
          </>
        </div>
      )}
    </div>
  );
};

export default AdminRegisterDashboard;
