import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminRegisterDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminVacantionDashboard = () => {
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
        "https://api.mwerr.de/api/v1/VacationManagement",
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
        "https://api.mwerr.de/api/v1/VacationManagement",
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

  const renderTable = (applications, title) => (
    <div
      className="admin-vac-dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
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
            <th>Bearbeite</th>
            <th>Update</th>
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
      <button className="reg-button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default AdminVacantionDashboard;
