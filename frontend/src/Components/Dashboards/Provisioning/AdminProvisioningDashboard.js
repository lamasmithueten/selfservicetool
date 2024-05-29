import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminVacantionDashboard.css";
import "../OptionButtons.css";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import { CiSettings } from "react-icons/ci";

const AdminProvisioningDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);
  const [reasons, setReasons] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [activeTab, setActiveTab] = useState("pending");
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
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
        "https://api.mwerr.de/api/v1/Provisionings/management",
        {
          headers: headers,
        }
      );

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
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
    setSelectedState({});
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

      let acceptOrDecline = selectedState[applicationId];
      if (acceptOrDecline === "accepted") {
        acceptOrDecline = true;
      } else if (acceptOrDecline === "declined") {
        acceptOrDecline = false;
      }

      const requestBody = {
        applicationId: applicationId,
        acceptOrDecline: acceptOrDecline,
        answer: reasons[applicationId],
      };

      console.log(requestBody);
      const response = await axios.put(
        "https://api.mwerr.de/api/v1/Provisionings",
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

  const handleOptionsMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserOption = (option) => {
    if (option === "register") {
      navigate("/registration-requests");
    } else if (option === "vacantion") {
      navigate("/vacantion-requests");
    } else if (option === "provision") {
      navigate("/provisioning-requests");
    } else if (option === "logout") {
      message.success("You have been logged out", 1500);
      localStorage.removeItem("token");
      navigate("/login");
    }
    setUserMenuOpen(false);
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
                <select
                  className="select"
                  onChange={(e) => handleChangeState(e, application.id)}
                  value={selectedState[application.id] || "accepted"}
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
                  onClick={() => handleButtonClick(application.id)}
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
      <h1>Umgebungsanträge</h1>
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

      <button className="first-button" onClick={handleOptionsMenu}>
        <CiSettings />
      </button>
      {isUserMenuOpen && (
        <div className="dropdown-menu">
          <>
            <button onClick={() => handleUserOption("register")}>
              Registrierungsanträge
            </button>
            <button onClick={() => handleUserOption("vacantion")}>
              Urlaubsanträge
            </button>
            <button onClick={() => handleUserOption("provision")}>
              Umgebungsanträge
            </button>
            <button onClick={() => handleUserOption("logout")}>Logout</button>
          </>
        </div>
      )}
    </div>
  );
};

export default AdminProvisioningDashboard;
