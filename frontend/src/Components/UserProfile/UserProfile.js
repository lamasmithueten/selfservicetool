import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import UserHeaderBar from "../HeaderBar/UserHeaderBar";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (localStorage.getItem("token") === null) {
          navigate("/login");
          return null;
        }
        const response = await fetch("https://api.mwerr.de/api/v1/Users", {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": "keyTest",
          },
        });
        const userData = await response.json();
        setUserInfo(userData);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div>
      <UserHeaderBar title="Profil" />

      <div className="user-info">
        {loading && <p>Loading user information...</p>}
        {userInfo && (
          <div className="content">
            <p>
              <span className="label">Username:</span>
              <span className="info">{userInfo.username}</span>
            </p>
            <p>
              <span className="label">Role:</span>
              <span className="info">{userInfo.role}</span>
            </p>
            <p>
              <span className="label">Email:</span>
              <span className="info">{userInfo.email}</span>
            </p>
            <p>
              <span className="label">Firstname:</span>
              <span className="info">{userInfo.firstname}</span>
            </p>
            <p>
              <span className="label">Lastname:</span>
              <span className="info">{userInfo.lastname}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
