import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "react-message-popup";
import { CiSettings, CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function EmployeeRequestVM({ toggleForm }) {
  const [formData, setFormData] = useState({
    purpose: "",
    virtualEnvironment: "",
  });
  const [error] = useState(null);
  const [environments, setEnvironments] = useState([]);
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchEnvironments() {
      try {
        const token = localStorage.getItem("token");
        if (token === null) {
          navigate("/login");
          return null;
        }

        const response = await axios.get(
          "https://api.mwerr.de/api/VirtualEnvironments",
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
              "x-api-key": "keyTest",
            },
          }
        );

        setEnvironments(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          message.error("Etwas ist schief gelaufen", 1500);
        }
      }
    }

    fetchEnvironments();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://api.mwerr.de/api/v1/Provisionings", formData, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "x-api-key": "keyTest",
        },
      });
      message.success("Antrag wurde gesendet", 1500);
    } catch (error) {
      message.error(
        "Bitte geben Sie den Zweck und wählen Sie ein Art aus der Liste",
        3000
      );
    }
  };

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

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>VM Beantragen</h1>
          {error && <p className="error">{error}</p>}
          <div className="input-box">
            <input
              type="text"
              name="purpose"
              placeholder="Zweck der virtuellen Umgebung"
              value={formData.purpose}
              onChange={handleChange}
              maxLength={100}
            />
          </div>
          <div className="input-select">
            <select
              name="virtualEnvironment"
              value={formData.virtualEnvironment}
              onChange={handleChange}
            >
              <option value="">Art der virtuellen Umgebung auswählen</option>
              {environments.map((env, index) => (
                <option key={index} value={env}>
                  {env}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">
            Beantragen
          </button>
        </form>
      </div>
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
}

export default EmployeeRequestVM;
