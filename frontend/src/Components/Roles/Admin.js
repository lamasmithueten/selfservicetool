import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminDashboard.css"

const TripleTable = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const headers = {
          accept: '*/*',
          'x-api-key': 'keyTest',
          Authorization: `Bearer ${token}`, // Include bearer token in the request header
        };
        const response = await axios.get('https://api.mwerr.de/api/v1/Vacation', {
          headers: headers,
        });

        setPendingApplications(response.data.pending_applications);
        setAcceptedApplications(response.data.accepted_applications);
        setDeclinedApplications(response.data.declined_applications);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleChangeState = (e, index) => {
    // select state for update request
  };

  const handleButtonClick = () => {
    // update request state and reason patch /api/v1/VacantionManagement
  };
  
  return (
    <div>
      {error && <p>{error}</p>}
      <div className= "dashboard" style={{ overflowY: 'auto', maxHeight: '200px', marginBottom: '20px' }}>
        <h2>Pending Applications</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>First Day</th>
              <th>Last Day</th>
              <th>Number of Days</th>
              <th>State</th>
              <th>Reason</th>
              <th>Change</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.map((application, index) => (
              <tr key={index}>
                <td>{application.firstname}</td>
                <td>{application.lastname}</td>
                <td>{application.first_day}</td>
                <td>{application.last_day}</td>
                <td>{application.number_of_days}</td>
                <td>{application.state}</td>
                <td>{application.reason}</td>
                <td>
                  <select className = "select" onChange={(e) => handleChangeState(e, index)}>
                    <option className="select-items" value="approve">approve</option>
                    <option value="decline">decline</option>
                  </select>
                </td>
                <td><button className="send" onClick={handleButtonClick}>Send</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className = "dashboard" style={{ overflowY: 'auto', maxHeight: '200px', marginBottom: '20px' }}>
        <h2>Declined Applications</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>First Day</th>
              <th>Last Day</th>
              <th>Number of Days</th>
              <th>State</th>
              <th>Reason</th>
              <th>Change</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {declinedApplications.map((application, index) => (
              <tr key={index}>
                <td>{application.firstname}</td>
                <td>{application.lastname}</td>
                <td>{application.first_day}</td>
                <td>{application.last_day}</td>
                <td>{application.number_of_days}</td>
                <td>{application.state}</td>
                <td>{application.reason}</td>
                <td>
                <select className = "select" onChange={(e) => handleChangeState(e, index)}>
                  <option className="select-items" value="approve">approve</option>
                  <option value="decline">decline</option>
                </select>
              </td>
              <td><button className="send" onClick={handleButtonClick}>Send</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className = "dashboard" style={{ overflowY: 'auto', maxHeight: '200px', marginBottom: '20px' }}>
        <h2>Accepted Applications</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>First Day</th>
              <th>Last Day</th>
              <th>Number of Days</th>
              <th>State</th>
              <th>Reason</th>
              <th>Change</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {acceptedApplications.map((application, index) => (
              <tr key={index}>
                <td>{application.firstname}</td>
                <td>{application.lastname}</td>
                <td>{application.first_day}</td>
                <td>{application.last_day}</td>
                <td>{application.number_of_days}</td>
                <td>{application.state}</td>
                <td>{application.reason}</td>
                <td>
                <select className = "select" onChange={(e) => handleChangeState(e, index)}>
                  <option className="select-items" value="approve">approve</option>
                  <option value="decline">decline</option>
                </select>
              </td>
                <td><button className="send" onClick={handleButtonClick}>Send</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TripleTable;
