import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeRequestsDashboard.css";
import { message } from "react-message-popup";
import { CiSettings, CiUser } from "react-icons/ci";

const EmployeeRequestsDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-api-key": "keyTest",
      };
      const response = await axios.get(
        "https://api.mwerr.de/api/v1/Vacations",
        {
          headers: headers,
        }
      );

      setPendingApplications(response.data.pending_applications);
      setAcceptedApplications(response.data.accepted_applications);
      setDeclinedApplications(response.data.declined_applications);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const handleOptionsMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserOption = (option) => {
    // TODO: switch case
    if (option === "vacantion") {
      navigate("/my-vacation-requests");
    } else if (option === "vacantion-new") {
      navigate("/vacation-request/new");
    } else if (option === "provision") {
      navigate("/my-provisioning-requests");
    } else if (option === "provision-new") {
      navigate("/provisioning-request/new");
    } else if (option === "environments") {
      navigate("/my-environments");
    } else if (option === "logout") {
      message.success("Sie wurden ausgelogt", 1500);
      localStorage.removeItem("token");
      navigate("/login");
    }
    setUserMenuOpen(false);
  };

  const handleProfile = () => {
    navigate("/my-profile");
  };

  const renderTable = (applications, title) => (
    <div
      className="employee-dash"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <div>
        <h3>{title}</h3>
        <table border="1" className="table">
          <thead>
            <tr>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Beginn</th>
              <th>Ende</th>
              <th>Anzahl Tage</th>
              <th>Status</th>
              <th>Grund</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td>{application.first_name}</td>
                <td>{application.last_name}</td>
                <td>{application.first_day}</td>
                <td>{application.last_day}</td>
                <td>{application.number_of_days}</td>
                <td>{application.state}</td>
                <td>{application.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Urlaubsanträge</h1>
      {error && <p>{error}</p>}
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("pending")}
          className={activeTab === "pending" ? "active" : ""}
        >
          Pending Applications
        </button>
        <button
          onClick={() => setActiveTab("accepted")}
          className={activeTab === "accepted" ? "active" : ""}
        >
          Accepted Applications
        </button>
        <button
          onClick={() => setActiveTab("declined")}
          className={activeTab === "declined" ? "active" : ""}
        >
          Declined Applications
        </button>
      </div>

      {activeTab === "pending" &&
        renderTable(pendingApplications, "Pending Applications")}
      {activeTab === "accepted" &&
        renderTable(acceptedApplications, "Accepted Applications")}
      {activeTab === "declined" &&
        renderTable(declinedApplications, "Declined Applications")}

      <button className="first-button" onClick={handleOptionsMenu}>
        <CiSettings />
      </button>
      {isUserMenuOpen && (
        <div className="dropdown-menu">
          <>
            <button onClick={() => handleUserOption("vacantion")}>
              Urlaubsanträge
            </button>
            <button onClick={() => handleUserOption("vacantion-new")}>
              Urlaub beantragen
            </button>
            <button onClick={() => handleUserOption("provision")}>
              Umgebungsanträge
            </button>
            <button onClick={() => handleUserOption("provision-new")}>
              Umgebung beantragen
            </button>
            <button onClick={() => handleUserOption("environments")}>
              Meine Umgebungen
            </button>
            <button onClick={() => handleUserOption("logout")}>Logout</button>
          </>
        </div>
      )}
      <button className="second-button" onClick={handleProfile}>
        <CiUser />
      </button>
    </div>
  );
};

export default EmployeeRequestsDashboard;
