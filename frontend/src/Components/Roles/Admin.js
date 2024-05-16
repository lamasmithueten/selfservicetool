import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminDashboard.css"
import { useNavigate } from "react-router-dom"; 

const TripleTable = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);
  const [reasons, setReasons] = useState({}); // Object to store reasons for each application
  const [state, setState] = useState('approve'); // Default state
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        accept: '*/*',
        'x-api-key': 'keyTest',
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('https://api.mwerr.de/api/v1/VacationManagement', {
        headers: headers,
      });

      setPendingApplications(response.data.pending_applications);
      setAcceptedApplications(response.data.accepted_applications);
      setDeclinedApplications(response.data.declined_applications);
      
      // Initialize reasons state for each application
      const reasonsObj = {};
      response.data.pending_applications.forEach(application => {
        reasonsObj[application.application_ID] = '';
      });
      response.data.accepted_applications.forEach(application => {
        reasonsObj[application.application_ID] = '';
      });
      response.data.declined_applications.forEach(application => {
        reasonsObj[application.application_ID] = '';
      });
      setReasons(reasonsObj);
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
        application_id: applicationId,
        state: state, 
        reason: reasons[applicationId], // Use reason from state object
      };
      
      console.log(requestBody)
      const response = await axios.patch('https://api.mwerr.de/api/v1/VacationManagement', requestBody, {
        headers: headers
      });

      console.log('Request successful:', response.data);

      // Refetch the data after successful PATCH request
      fetchData();
      
      // Optionally, you can update the state or perform other actions upon successful request
    } catch (error) {
      console.error('Error while sending PATCH request:', error);
      // Handle error appropriately, such as displaying an error message to the user
    }
  };

  const handleChangeReason = (e, applicationId) => {
    const { value } = e.target;
    setReasons(prevState => ({
      ...prevState,
      [applicationId]: value, // Update reason for specific application
    }));
  };

  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };
  
  return (
    <div>
      {error && <p>{error}</p>}
      <div className= "dashboard" style={{ overflowY: 'auto', maxHeight: '200px', marginBottom: '20px' }}>
        <h2>Ausstehende Anträge</h2>
        <table border="1" className='table'>
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
            {pendingApplications.map((application, index) => (
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
                    value={reasons[application.application_ID]}
                    onChange={(e) => handleChangeReason(e, application.application_ID)}
                    className="textfield"
                    maxLength={100}
                  />
                </td>
                <td>
                  <select className="select" onChange={handleChangeState}>
                    <option className="select-items" value="accepted">approve</option>
                    <option value="declined">decline</option>
                  </select>
                </td>
                <td><button className="send" onClick={() => handleButtonClick(application.application_ID)}>Send</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className = "dashboard" style={{ overflowY: 'auto', maxHeight: '200px', marginBottom: '20px' }}>
        <h2>Abgelehnte Anträge</h2>
        <table border="1" className='table'>
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
            {declinedApplications.map((application, index) => (
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
                    onChange={(e) => handleChangeReason(e, application.application_ID)}
                    className="textfield"
                    maxLength={100}
                  />
                </td>
                <td>
                  <select className = "select" onChange={handleChangeState}>
                    <option className="select-items" value="accepted">approve</option>
                    <option value="declined">decline</option>
                  </select>
                </td>
                <td><button className="send" onClick={() => handleButtonClick(application.application_ID)}>Send</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className = "dashboard" style={{ overflowY: 'auto', maxHeight: '200px', marginBottom: '20px' }}>
        <h2>Akzeptierte Anträge</h2>
        <table border="1" className='table'>
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
            {acceptedApplications.map((application, index) => (
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
                    onChange={(e) => handleChangeReason(e, application.application_ID)}
                    className="textfield"
                    maxLength={100}
                  />
                </td>
                <td>
                  <select className = "select" onChange={handleChangeState}>
                    <option className="select-items" value="accepted">approve</option>
                    <option value="declined">decline</option>
                  </select>
                </td>
                <td><button className="send" onClick={() => handleButtonClick(application.application_ID)}>Send</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};


export default TripleTable;
