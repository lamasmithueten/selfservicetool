import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";

import "./UserProfile.css";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("https://api.mwerr.de/api/v1/Users", {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": "keyTest",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const userData = await response.json();
        setUserInfo(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user information:", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleProfile = () => {
    navigate("/my-profile");
  };

  return (
    <div>
      <div className="user-info">
        <h1>User Profile</h1>
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
        {!loading && !userInfo && (
          <p>Error fetching user information. Please try again later.</p>
        )}
      </div>
      <button className="first-button" onClick={handleBack}>
        <GoArrowLeft />
      </button>
      <button className="second-button" onClick={handleProfile}>
        <CiUser />
      </button>
    </div>
  );
};

export default UserProfile;
