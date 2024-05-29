import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminVacantionDashboard.css";
import "../OptionButtons.css";
import { useNavigate } from "react-router-dom";

const AdminProvisioningDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);
  const [reasons, setReasons] = useState({});
  const [selectedState, setSelectedState] = useState({});
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

      const reasonsObj = {};
      response.data.pending_applications.forEach((application) => {
        reasonsObj[application.application_ID] = application.reason || "";
      });
      response.data.accepted_applications.forEach((application) => {
        reasonsObj[application.application_ID] = application.reason || "";
      });
      response.data.declined_applications.forEach((application) => {
        reasonsObj[application.application_ID] = application.reason || "";
      });
      setReasons(reasonsObj);
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
        application_id: applicationId,
        state: selectedState[applicationId] || "accepted",
        reason: reasons[applicationId],
      };

      console.log(requestBody);
      const response = await axios.patch(
        "https://api.mwerr.de/api/v1/Provisioning",
        requestBody,
        {
          headers: headers,
        }
      );

      console.log("Request successful:", response.data);
      setSelectedState({});
      fetchData();
    } catch (error) {
      console.error("Error while sending PATCH request:", error);
    }
  };

  const handleChangeReason = (e, applicationId) => {
    const { value } = e.target;
    setReasons((prevState) => ({
      ...prevState,
      [applicationId]: value,
    }));
  };

  const handleChangeState = (e, applicationId) => {
    const { value } = e.target;
    setSelectedState((prevState) => ({
      ...prevState,
      [applicationId]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/registrierungsantraege");
  };

  const handleUrlaub = () => {
    navigate("/urlaubsantraege");
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
            <th>Nutzer-ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
            <th>Grund</th>
            <th>Bearbeite</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {pendingApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.antrags_id}</td>
              <td>{application.nutzer_id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.art}</td>
              <td>{application.zweck}</td>
              <td>
                <input
                  type="text"
                  placeholder={application.reason}
                  value={reasons[application.application_ID]}
                  onChange={(e) =>
                    handleChangeReason(e, application.application_ID)
                  }
                  className="textfield"
                  maxLength={100}
                />
              </td>
              <td>
                <select
                  className="select"
                  onChange={(e) =>
                    handleChangeState(e, application.application_ID)
                  }
                  value={
                    selectedState[application.application_ID] || "accepted"
                  }
                >
                  <option className="select-items" value="accepted">
                    accept
                  </option>
                  <option value="declined">decline</option>
                </select>
              </td>
              <td>
                <button
                  className="send"
                  onClick={() => handleButtonClick(application.application_ID)}
                >
                  Send
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
      className="admin-vac-dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Accepted Applications</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Antrags-ID</th>
            <th>Nutzer-ID</th>
            <th>Username</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Art der Umgebung</th>
            <th>Zweck</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {acceptedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.antrags_id}</td>
              <td>{application.nutzer_id}</td>
              <td>{application.username}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.art}</td>
              <td>{application.zweck}</td>
              <td>{application.ip}</td>
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
              <td>{application.antrags_id}</td>
              <td>{application.nutzer_id}</td>
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

      {activeTab === "pending" && renderPendingTable()}
      {activeTab === "accepted" && renderAcceptedTable()}
      {activeTab === "declined" && renderDeclinedTable()}

      <button className="first-button" onClick={handleLogout}>
        Logout
      </button>
      <button className="second-button" onClick={handleRegister}>
        Register
      </button>
      <button className="third-button" onClick={handleUrlaub}>
        Urlaub
      </button>
    </div>
  );
};

export default AdminProvisioningDashboard;
