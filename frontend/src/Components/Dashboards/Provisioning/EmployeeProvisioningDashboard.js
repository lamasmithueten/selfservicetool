import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminVacantionDashboard.css";
import "../OptionButtons.css";
import { useNavigate } from "react-router-dom";

const EmployeeProvisioningDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        "x-api-key": "keyTest",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "https://api.mwerr.de/api/v1/Provisioning",
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMeine = () => {
    navigate("/antraege");
  };

  const handleUrlaub = () => {
    navigate("/employee ");
  };

  const renderPendingTable = () => (
    <div
      className="admin-vac-dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Pending Applications</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pendingApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.antrags_id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.art}</td>
              <td>{application.zweck}</td>
              <td>{application.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAcceptedTable = () => (
    <div
      className="admin-vac-dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Accepted Applications</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {acceptedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.antrags_id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.art}</td>
              <td>{application.zweck}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDeclinedTable = () => (
    <div
      className="admin-vac-dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Declined Applications</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
            <th>Grund</th>
          </tr>
        </thead>
        <tbody>
          {declinedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.antrags_id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.art}</td>
              <td>{application.zweck}</td>
              <td>{application.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMyVms = () => (
    <div
      className="admin-vac-dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Accepted Applications</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
            <th>Status</th>
            <th>IP</th>
            <th>Nutzername</th>
            <th>Passwort</th>
          </tr>
        </thead>
        <tbody>
          {acceptedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.antrags_id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.art}</td>
              <td>{application.zweck}</td>
              <td>{application.ip}</td>
              <td>{application.username}</td>
              <td>{application.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
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
        <button
          onClick={() => setActiveTab("myvms")}
          className={activeTab === "myvms" ? "active" : ""}
        >
          Meine Umgebungen
        </button>
      </div>

      {activeTab === "pending" && renderPendingTable()}
      {activeTab === "accepted" && renderAcceptedTable()}
      {activeTab === "declined" && renderDeclinedTable()}
      {activeTab === "myvms" && renderMyVms()}

      <button className="first-button" onClick={handleLogout}>
        Logout
      </button>
      <button className="third-button" onClick={handleUrlaub}>
        Antrag stellen
      </button>
      <button className="second-button" onClick={handleMeine}>
        Meine Anträge
      </button>
    </div>
  );
};

export default EmployeeProvisioningDashboard;
