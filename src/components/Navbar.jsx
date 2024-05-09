import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nav-logo.png";
import { useUser } from "../../context/AuthContext";

function Navbar() {
  const { userData } = useUser();

  return (
    <div className="nav-container">
      <div className="navbar">
        <ul>
          <Link to="/">
            <li className="nav-logo">
              <img src={logo} alt="logo" />
              <h2 className="logo-text">Saham</h2>
            </li>
          </Link>

          {userData.isAdmin && (
            <Link to="/dashboard">
              <i class="bx bxs-dashboard"></i>
              <li>Dashboard</li>
            </Link>
          )}

          <Link to="/predictions">
            <li>Predictions</li>
          </Link>

          <div>
            <i class="bx bx-list-ul"></i>
            <li>Sign up</li>
          </div>

          <Link to="/profile">
            <i class="bx bx-user"></i>
            <li>Profile</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
