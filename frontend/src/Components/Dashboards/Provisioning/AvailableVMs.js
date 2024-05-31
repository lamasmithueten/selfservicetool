import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";
import UserHeaderBar from "../../HeaderBar/UserHeaderBar";

const AvailableVMs = () => {
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [error] = useState(null);
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

      setAcceptedApplications(response.data.accepted_applications);
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

  const renderMyVms = () => (
    <div
      className="dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Nutzername</th>
            <th>Passwort</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {acceptedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.virtual_environment}</td>
              <td>{application.username}</td>
              <td>{application.password}</td>
              <td>{application.iP_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <UserHeaderBar title="Meine Umgebungen" />
      {error && <p>{error}</p>}
      {renderMyVms()}
    </div>
  );
};

export default AvailableVMs;
