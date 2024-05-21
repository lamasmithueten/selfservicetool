import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeRequestsDashboard.css";

const EmployeeRequestsDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
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
      const response = await axios.get("https://api.mwerr.de/api/v1/Vacation", {
        headers: headers,
      });

      setPendingApplications(response.data.pending_applications);
      setAcceptedApplications(response.data.accepted_applications);
      setDeclinedApplications(response.data.declined_applications);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMeine = () => {
    navigate("/employee");
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

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <button className="meine-antrage" onClick={handleMeine}>
        Meine Anträge
      </button>
    </div>
  );
};

export default EmployeeRequestsDashboard;
