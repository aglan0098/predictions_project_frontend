import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Predictions from "./pages/Predictions";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import { useAuth, useUser } from "../context/AuthContext";

import "./App.css";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { setUserData } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    const user = localStorage.getItem("userData");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route element={<Outlet />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/company-details" element={<Company />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="*" element={<Register />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
