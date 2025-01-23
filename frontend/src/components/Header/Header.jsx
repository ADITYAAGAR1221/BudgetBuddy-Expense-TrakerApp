import React, { useEffect } from 'react';
import "./Header.css"; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg";
import api from "../../libs/apiCall.js"; // Import the backend API call utility

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage

  useEffect(() => {
    // If no user is found, redirect to the login page
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  async function logoutFuc() {
    try {
      // Call the backend API to log out the user
      await api.post("/auth/logout");

      // Clear the user's session data
      localStorage.removeItem("user");
      toast.success("Logged Out Successfully!");
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Logout Failed!");
    }
  }

  return (
    <div className="navbar">
      <p className="logo"> Budgetbuddy. </p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            alt="User"
            style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
          />
          <p className="logo link" onClick={logoutFuc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
