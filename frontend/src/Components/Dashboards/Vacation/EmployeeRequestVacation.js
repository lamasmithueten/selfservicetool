import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Dashboard.css";
import "../Calendar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "react-message-popup";
import { CiSettings, CiUser } from "react-icons/ci";

const EmployeeRequestVacation = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [workdays, setWorkdays] = useState(null);
  const [vacationDays, setVacationDays] = useState(null);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleOptionsMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserOption = (option) => {
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

  const fetchVacationDays = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    try {
      const response = await axios.get(
        `https://api.mwerr.de/api/v1/VacationDays`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "x-api-key": "keyTest",
          },
        }
      );
      setVacationDays(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchVacationDays();
  }, [fetchVacationDays]);

  const handleVacRequest = async () => {
    try {
      const startDateString = startDate
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("-");
      const endDateString = endDate
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("-");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://api.mwerr.de/api/v1/Vacations`,
        {
          first_day: startDateString,
          last_day: endDateString,
        },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "x-api-key": "keyTest",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        message.success("Antrag gesendet", 2000);
      }
    } catch (error) {
      message.error("Antrag wurde nicht gesendet", 2000);
    }
  };

  const fetchWorkdays = useCallback(async (start, end) => {
    const startDateString = start
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")
      .join("-");
    const endDateString = end
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")
      .join("-");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`https://api.mwerr.de/api/v1/Workdays`, {
        params: {
          startDate: startDateString,
          endDate: endDateString,
        },
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "x-api-key": "keyTest",
        },
      });
      setWorkdays(response.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchWorkdays(startDate, endDate);
    }
  }, [startDate, endDate, fetchWorkdays]);

  return (
    <div className="container">
      <div className="calendar-info-container">
        <div className="calendar-container">
          <h1>Neue Urlaubsantrag</h1>

          <DatePicker
            selected={startDate}
            onChange={handleSelect}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          {startDate && endDate && (
            <div className="selected-vac">
              <p>Beginndatum: {startDate.toLocaleDateString()}</p>
              <p>Endedatum: {endDate.toLocaleDateString()}</p>
              {workdays !== null && <p>Arbeitstage: {workdays}</p>}
            </div>
          )}
          <button className="antrag-button" onClick={handleVacRequest}>
            Antrag erstellen
          </button>
        </div>
        <div className="vacation-days-info">
          {vacationDays && (
            <div>
              <h3>Info</h3>
              <p>Tage gesamt: {vacationDays.total_days}</p>
              <p>Tage benutzt: {vacationDays.used_days}</p>
              <p>Tage geplant: {vacationDays.planned_days}</p>
            </div>
          )}
        </div>
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
};

export default EmployeeRequestVacation;
