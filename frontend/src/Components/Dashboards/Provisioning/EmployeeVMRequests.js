import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../Dashboard.css";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import UserHeaderBar from "../../HeaderBar/UserHeaderBar";

const EmployeeVMRequests = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        navigate("/login");
        return null;
      }
      const headers = {
        accept: "*/*",
        "x-api-key": "keyTest",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "https://api.mwerr.de/api/v1/Provisionings",
        {
          headers: headers,
        }
      );

      setPendingApplications(response.data.pending_applications);
      setAcceptedApplications(response.data.accepted_applications);
      setDeclinedApplications(response.data.declined_applications);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        message.error("Etwas ist schief gelaufen", 1500);
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderPendingTable = () => (
    <div
      className="dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Ausstehend</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
          </tr>
        </thead>
        <tbody>
          {pendingApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.virtual_environment}</td>
              <td>{application.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAcceptedTable = () => (
    <div
      className="dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Genehmigt</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Antwort</th>
          </tr>
        </thead>
        <tbody>
          {acceptedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.virtual_environment}</td>
              <td>{application.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDeclinedTable = () => (
    <div
      className="dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Abgelehnt</h2>
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
              <td>{application.id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.virtual_environment}</td>
              <td>{application.purpose}</td>
              <td>{application.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <UserHeaderBar title="Meine Umgebungsanträge" />
      {error && <p>{error}</p>}
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("pending")}
          className={activeTab === "pending" ? "active" : ""}
        >
          Ausstehend
        </button>
        <button
          onClick={() => setActiveTab("accepted")}
          className={activeTab === "accepted" ? "active" : ""}
        >
          Genehmigt
        </button>
        <button
          onClick={() => setActiveTab("declined")}
          className={activeTab === "declined" ? "active" : ""}
        >
          Abgelehnt
        </button>
      </div>

      {activeTab === "pending" && renderPendingTable()}
      {activeTab === "accepted" && renderAcceptedTable()}
      {activeTab === "declined" && renderDeclinedTable()}
    </div>
  );
};

export default EmployeeVMRequests;
