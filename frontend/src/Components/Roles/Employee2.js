import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { message } from "react-message-popup";

const Calendar = () => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const handleMeine = () => {
    navigate("/antraege");
  };

  const fetchVacationDays = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://api.mwerr.de/api/v1/VacationDays`, {
        headers: {
          'accept': '*/*',
          Authorization: `Bearer ${token}`,
          'x-api-key': 'keyTest'
        }
      });
      setVacationDays(response.data);
    } catch (error) {
      console.error('Error fetching vacation days:', error);
    }
  };

  useEffect(() => {
    fetchVacationDays();
  }, []);

  const handleVacRequest = async () => {
    try {
      const startDateString = startDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
      const endDateString = endDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
      const token = localStorage.getItem('token');

      const response = await axios.post(`https://api.mwerr.de/api/v1/Vacation`, {
        first_day: startDateString,
        last_day: endDateString
      }, {
        headers: {
          'accept': '*/*',
          Authorization: `Bearer ${token}`,
          'x-api-key': 'keyTest',
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 204) {
        message.success("Antrag gesendet", 2000);
      }
    } catch (error) {
      console.error('Error sending vacation request:', error);
    }
  };

  const fetchWorkdays = async (start, end) => {
    const startDateString = start.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
    const endDateString = end.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
    const token = localStorage.getItem('token');
    console.log(startDateString)
    try {
      const response = await axios.get(`https://api.mwerr.de/api/v1/Workdays`, {
        params: {
          startDate: startDateString,
          endDate: endDateString
        },
        headers: {
          'accept': '*/*',
          Authorization: `Bearer ${token}`,
          'x-api-key': 'keyTest'
        }
      });
      setWorkdays(response.data);
    } catch (error) {
      console.error('Error fetching workdays:', error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchWorkdays(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className='container'>
      <h2>Urlaubsantrag</h2>
      <DatePicker
        selected={startDate}
        onChange={handleSelect}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      {startDate && endDate && (
        <div className='selected-vac'>
          <p>Beginndatum: {startDate.toLocaleDateString()}</p>
          <p>Endedatum: {endDate.toLocaleDateString()}</p>
          {workdays !== null && (
            <p>Arbeitstage: {workdays}</p>
          )}
        </div>
      )}

      <div className='vacation-days-info'>
        {vacationDays && (
          <div>
            <h3>Info</h3>
            <p>Tage gesamt: {vacationDays.total_days}</p>
            <p>Tage benutzt: {vacationDays.used_days}</p>
            <p>Tage geplant: {vacationDays.planned_days}</p>
          </div>
        )}
      </div>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="meine-antrage" onClick={handleMeine}>Meine Anträge</button>
      <button className="antrag-button" onClick={handleVacRequest}>Antrag erstellen</button>
    </div>
  );
};

export default Calendar;
