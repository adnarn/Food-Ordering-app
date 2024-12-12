import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import lightIcon from '../../assets/day.png';
import darkIcon from '../../assets/night.png';
import '../../App.css'
import {auth} from '../../../firebase'
import { signOut } from "firebase/auth";
import { toast } from "react-toastify"; // Assuming you're using react-toastify
import { useNavigate } from "react-router-dom";

function Navbar({ theme, toggle_mode }) {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Clear token and any user-related data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        toast.success("Logged out successfully.");
        navigate("/login"); // Redirect to login
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <nav className={`navigation ${theme === "light" ? "nav-light" : "nav-dark"}`}>
        <div className={`container ${theme === "light" ? "nav-light" : "nav-dark"}`}>
          {/* Logo */}
          <div className={`contents ${theme === "light" ? "nav-light" : "nav-dark"}`}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* Menu links */}
          <div className={`menu-wrapper ${theme === "light" ? "nav-light" : "nav-dark"}`}>
            <a href="#" id="name">
              <FaUserCircle /> Welcome, Admin
            </a>
          </div>

          {/* Cart and Auth */}
          <div className={`auth ${theme === "light" ? "nav-light" : "nav-dark"}`}>
            <img
              onClick={toggle_mode}
              src={theme === "light" ? darkIcon : lightIcon}
              className="toggle"
              alt="Toggle Theme"
            />
            <Link to="/login" onClick={logoutUser}>
              Log Out
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
