import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Dashboard.css";
import "../Calendar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "react-message-popup";
import UserHeaderBar from "../../HeaderBar/UserHeaderBar";

const EmployeeRequestVacation = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [workdays, setWorkdays] = useState(null);
  const [vacationDays, setVacationDays] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
        fetchVacationDays(); // update info div
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error("Sie haben bereits ein Antrag für diese Tage", 2000);
      } else if (error.response && error.response.status === 422) {
        message.error("Die gewählte Tage sind Feiertage", 2000);
      } else if (
        error.response.status === 400 &&
        error.response.data === "User has not enough days left"
      ) {
        message.error("Sie haben nicht genügend Tage übrig", 2000);
      } else if (
        error.response.status === 400 &&
        error.response.data === "no requests in the past"
      ) {
        message.error(
          "Sie können keine Anträge in die Vergangenheit erstellen",
          2000
        );
      }
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
      <UserHeaderBar title="Neuer Urlaubsantrag" />
      <div className="calendar-info-container">
        <div className="calendar-container">
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
    </div>
  );
};

export default EmployeeRequestVacation;
