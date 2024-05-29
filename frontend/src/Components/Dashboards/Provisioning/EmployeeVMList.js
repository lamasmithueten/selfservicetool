import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "react-message-popup";
import { CiSettings, CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const EmployeeVMList = () => {
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [error, setError] = useState(null);
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
        "https://api.mwerr.de/api/v1/Provisionings",
        {
          headers: headers,
        }
      );

      setAcceptedApplications(response.data.accepted_applications);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleOptionsMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserOption = (option) => {
    // TODO: switch case
    if (option === "vacantion") {
      navigate("/my-vacation-requests");
    } else if (option === "vacantion-new") {
      navigate("/vacation-request/new");
    } else if (option === "provision") {
      navigate("/my-provisioning-requests");
    } else if (option === "provision-new") {
      navigate("/provisioning-request/new");
    } else if (option === "environments") {
      navigate("/my-environments");
    } else if (option === "logout") {
      message.success("Sie wurden ausgelogt", 1500);
      localStorage.removeItem("token");
      navigate("/login");
    }
    setUserMenuOpen(false);
  };

  const handleProfile = () => {
    navigate("/my-profile");
  };

  const renderMyVms = () => (
    <div
      className="admin-vac-dashboard"
      style={{ overflowY: "auto", maxHeight: "800px", marginBottom: "20px" }}
    >
      <h2>Meine Umgebungen</h2>
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
      <h1>Meine Umgebungen</h1>
      {error && <p>{error}</p>}
      {renderMyVms()}
      <button className="first-button" onClick={handleOptionsMenu}>
        <CiSettings />
      </button>
      {isUserMenuOpen && (
        <div className="dropdown-menu">
          <>
            <button onClick={() => handleUserOption("vacantion")}>
              Urlaubsanträge
            </button>
            <button onClick={() => handleUserOption("vacantion-new")}>
              Urlaub beantragen
            </button>
            <button onClick={() => handleUserOption("provision")}>
              Umgebungsanträge
            </button>
            <button onClick={() => handleUserOption("provision-new")}>
              Umgebung beantragen
            </button>
            <button onClick={() => handleUserOption("environments")}>
              Meine Umgebungen
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

export default EmployeeVMList;
