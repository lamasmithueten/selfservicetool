import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import axios from "axios";
import "../Dashboard.css";
import AdminHeaderBar from "../../HeaderBar/AdminHeaderBar";

const AdminRegisterDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        navigate("/login");
        return;
      }

      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-api-key": "keyTest",
      };

      const response = await axios.get(
        "https://api.mwerr.de/api/v1/RegistrationApplications",
        { headers }
      );

      if (response.status === 401 || response.status === 403) {
        navigate("/login");
        return null;
      }

      const data = response.data;
      setApplications(
        data.map((app) => ({
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
      if (
        (error.response && error.response.status === 401) ||
        (error.response && error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        message.error("Etwas ist schief gelaufen", 1500);
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleButtonClick = async (applicationId, acceptOrDecline) => {
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
        acceptOrDecline: acceptOrDecline === "accepted" ? true : false,
        editRole: "employee",
      };

      await axios.post(
        "https://api.mwerr.de/api/v1/RegistrationApplications",
        requestBody,
        { headers }
      );

      message.success("Anfrage wurde erfolgreich bearbeitet.");
      fetchData();
    } catch (error) {
      message.error("Etwas ist schief gelaufen, bitte versuchen Sie erneut.");
    }
  };

  return (
    <div>
      <AdminHeaderBar title="Registrierungsanträge" />
      {error && <p>{error}</p>}
      <div
        className="dashboard"
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
                  <button
                    className="accept-button"
                    onClick={() =>
                      handleButtonClick(application.id, "accepted")
                    }
                  >
                    Ja
                  </button>
                  <button
                    className="decline-button"
                    onClick={() =>
                      handleButtonClick(application.id, "declined")
                    }
                  >
                    Nein
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegisterDashboard;
