import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeRequestsDashboard.css";
import "./AdminVacantionDashboard";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);
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

  return (
    <div>
      {error && <p>{error}</p>}
      <div
        className="employee-dash"
        style={{ overflowY: "auto", maxHeight: "250px", marginBottom: "20px" }}
      >
        <h3>Meine Anträge</h3>
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
            {pendingApplications.map((application, index) => (
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

      <div
        className="employee-dash"
        style={{ overflowY: "auto", maxHeight: "250px", marginBottom: "20px" }}
      >
        <h3>Akzeptierte Anträge</h3>
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
            {acceptedApplications.map((application, index) => (
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

      <div
        className="employee-dash"
        style={{ overflowY: "auto", maxHeight: "250px", marginBottom: "20px" }}
      >
        <h3>Abgelehnte Anträge</h3>
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
            {declinedApplications.map((application, index) => (
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
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <button className="meine-antrage" onClick={handleMeine}>
        Antrag erstellen
      </button>
    </div>
  );
};

export default EmployeeDashboard;
