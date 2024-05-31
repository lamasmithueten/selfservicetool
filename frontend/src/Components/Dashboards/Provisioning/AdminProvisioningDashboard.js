import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../Dashboard.css";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import AdminHeaderBar from "../../HeaderBar/AdminHeaderBar";

const AdminProvisioningDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error] = useState(null);
  const [reasons, setReasons] = useState({});
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
        "https://api.mwerr.de/api/v1/Provisionings/management",
        {
          headers: headers,
        }
      );

      if (response.status === 401 || response.status === 403) {
        navigate("/login");
        return null;
      }
      setPendingApplications(response.data.pending_applications);
      setAcceptedApplications(response.data.accepted_applications);
      setDeclinedApplications(response.data.declined_applications);

      const reasonsObj = {};
      response.data.pending_applications.forEach((application) => {
        reasonsObj[application.id] = application.reason || "";
      });
      response.data.accepted_applications.forEach((application) => {
        reasonsObj[application.id] = application.reason || "";
      });
      response.data.declined_applications.forEach((application) => {
        reasonsObj[application.id] = application.reason || "";
      });
      setReasons(reasonsObj);
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

  const handleButtonClick = async (applicationId, acceptOrDeclineValue) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-api-key": "keyTest",
        "Content-Type": "application/json",
      };

      const requestBody = {
        applicationId: applicationId,
        acceptOrDecline: acceptOrDeclineValue,
        answer: reasons[applicationId],
      };

      await axios.put(
        "https://api.mwerr.de/api/v1/Provisionings",
        requestBody,
        {
          headers: headers,
        }
      );

      fetchData();
      message.success("Anfrage wurde bearbeitet");
    } catch (error) {}
  };

  const handleChangeReason = (e, applicationId) => {
    const { value } = e.target;
    setReasons((prevState) => ({
      ...prevState,
      [applicationId]: value,
    }));
  };

  const renderPendingTable = () => (
    <div
      className="dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Ausstehende Anfragen</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Nutzer-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
            <th>Grund</th>
            <th>Gehnemigen</th>
          </tr>
        </thead>
        <tbody>
          {pendingApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.id}</td>
              <td>{application.iD_user}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.virtual_environment}</td>
              <td>{application.purpose}</td>
              <td>
                <input
                  type="text"
                  placeholder={application.reason}
                  value={reasons[application.id]}
                  onChange={(e) => handleChangeReason(e, application.id)}
                  className="textfield"
                  maxLength={100}
                />
              </td>
              <td>
                <button
                  className="accept-button"
                  onClick={() => handleButtonClick(application.id, true)}
                >
                  Ja
                </button>
                <button
                  className="decline-button"
                  onClick={() => handleButtonClick(application.id, false)}
                >
                  Nein
                </button>
              </td>
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
      <h2>Genehmigte Anfragen</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Nutzer-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Username</th>
            <th>Passwort</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {acceptedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.id}</td>
              <td>{application.iD_user}</td>
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

  const renderDeclinedTable = () => (
    <div
      className="dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Abgelehnte Anfragen</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Nutzer-ID</th>
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
              <td>{application.iD_user}</td>
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
      <AdminHeaderBar title="Umgebungsanträge" />
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

export default AdminProvisioningDashboard;
