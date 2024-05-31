import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../Dashboard.css";
import { useNavigate } from "react-router-dom";
import { CiSettings, CiUser } from "react-icons/ci";
import { message } from "react-message-popup";

const AdminVacationDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error] = useState(null);
  const [reasons, setReasons] = useState({});
  const [activeTab, setActiveTab] = useState("pending");
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
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
        "https://api.mwerr.de/api/v1/VacationManagement",
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

  const handleButtonClick = async (applicationId, state) => {
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
        state: state,
        reason: reasons[applicationId],
      };

      await axios.patch(
        "https://api.mwerr.de/api/v1/VacationManagement",
        requestBody,
        {
          headers: headers,
        }
      );

      message.success("Anfrage wurde bearbeitet", 1500);
      fetchData();
    } catch (error) {
      message.error("Anfrage wurde nicht bearbeitet", 1500);
    }
  };

  const handleChangeReason = (e, applicationId) => {
    const { value } = e.target;
    setReasons((prevState) => ({
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
    } else if (option === "vacation") {
      navigate("/vacation-requests");
    } else if (option === "provision") {
      navigate("/provisioning-requests");
    } else if (option === "logout") {
      message.success("You have been logged out", 1500);
      localStorage.removeItem("token");
      navigate("/login");
    }
    setUserMenuOpen(false);
  };

  const handleProfile = () => {
    navigate("/my-profile");
  };

  const renderTable = (applications, title) => (
    <div className="dashboard">
      <h2>{title}</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Beginn</th>
            <th>Ende</th>
            <th>Länge</th>
            <th>Zustand</th>
            <th>Grund</th>
            <th>Genehmige</th>
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
                <div>
                  <button
                    className="accept-button"
                    onClick={() =>
                      handleButtonClick(application.application_ID, "accepted")
                    }
                  >
                    Ja
                  </button>
                  <button
                    className="decline-button"
                    onClick={() =>
                      handleButtonClick(application.application_ID, "declined")
                    }
                  >
                    Nein
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h1>Urlaubsanträge</h1>
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

      <button className="first-button" onClick={handleOptionsMenu}>
        <CiSettings />
      </button>
      {isUserMenuOpen && (
        <div className="dropdown-menu">
          <>
            <button onClick={() => handleUserOption("register")}>
              Registrierungsanträge
            </button>
            <button onClick={() => handleUserOption("vacation")}>
              Urlaubsanträge
            </button>
            <button onClick={() => handleUserOption("provision")}>
              Umgebungsanträge
            </button>
            <button onClick={() => handleUserOption("logout")}>Logout</button>
          </>
        </div>
      )}
      <button className="second-button" onClick={handleProfile}>
        <CiUser />
      </button>
    </div>
  );
};

export default AdminVacationDashboard;
