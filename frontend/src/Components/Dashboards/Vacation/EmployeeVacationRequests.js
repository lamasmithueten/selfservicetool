import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { message } from "react-message-popup";
import UserHeaderBar from "../../HeaderBar/UserHeaderBar";

const EmployeeVacationRequests = () => {
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

  const renderTable = (applications, title) => (
    <div
      className="dashboard"
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
      <UserHeaderBar title="Meine Urlaubsanträge" />
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

      {activeTab === "pending" &&
        renderTable(pendingApplications, "Ausstehende Anfragen")}
      {activeTab === "accepted" &&
        renderTable(acceptedApplications, "Genehmigte Anfragen")}
      {activeTab === "declined" &&
        renderTable(declinedApplications, "Abgelehnte Anfragen")}
    </div>
  );
};

export default EmployeeVacationRequests;
