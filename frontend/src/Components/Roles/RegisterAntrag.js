import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminDashboard.css"
import { useNavigate } from "react-router-dom"; 
import "./RegisterAntrag.css"

const RegisterAntrag = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [state, setState] = useState('accepted'); 
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
        'x-api-key': 'keyTest',
      };
      const response = await axios.get('https://api.mwerr.de/api/v1/RegistrationApplication', {
        headers: headers,
      });

      setApplications(response.data.map(app => ({
        username: app.username,
        role: app.role,
        email: app.email,
        firstname: app.firstname,
        lastname: app.lastname,
        application_date: app.application_date,
        id: app.id,
      })));
    } catch (error) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'x-api-key': 'keyTest',
        'Content-Type': 'application/json',
      };

      const requestBody = {
        id: applicationId,
        acceptOrDecline: state === 'accepted' ? true : false,
        editRole: 'employee', 
      };

      const response = await axios.post('https://api.mwerr.de/api/v1/RegistrationApplication', requestBody, {
        headers: headers
      });

      console.log('Request successful:', response.data);
      fetchData()

    } catch (error) {
      console.error('Error while sending POST request:', error);
    }
  };

  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const handleUrlaub = () => {
    navigate("/urlaubsantraege");
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <div className= "register-dash" style={{ overflowY: 'auto', maxHeight: '600px', marginBottom: '20px' }}>
        <h2>Ausstehende Registrierungsanträge</h2>
        <table border="1" className='table'>
          <thead>
            <tr>
              <th>Benutzername</th>
              <th>Rolle</th>
              <th>Email</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Antragsdatum</th>
              <th>Bearbeite</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td>{application.username}</td>
                <td>{application.role}</td>
                <td>{application.email}</td>
                <td>{application.firstname}</td>
                <td>{application.lastname}</td>
                <td>{application.application_date}</td>
                <td>
                  <select className="select" onChange={handleChangeState}>
                    <option className="select-items" value="accepted">approve</option>
                    <option value="declined">decline</option>
                  </select>
                </td>
                <td><button className="send" onClick={() => handleButtonClick(application.id)}>Send</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="vacantion-button" onClick={handleUrlaub}>Urlaub</button>

    </div>
  );
};

export default RegisterAntrag;
