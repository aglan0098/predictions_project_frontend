import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

import { useAuth, useUser } from "../../context/AuthContext";

function Login() {
  const { setIsAuthenticated } = useAuth();
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiBaseUrl}login`, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      setUserData(response.data.user);
      navigate("/home");
    } catch (error) {
      console.error("Login Failed", error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="intro">
        <p className="text">
          Unlock Tomorrow's <br /> Market secrets Tody - <br /> Elevate Your
          Trades <br /> with Inelligent <br /> Precision!
        </p>
      </div>
      <div className="box">
        <div class="logo">
          <img src={logo} alt="logo" />
          <h2>Sign in</h2>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">
            Email or Phone Number <span>*</span>
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div>
            <label htmlFor="password">
              Password <span>*</span>{" "}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn submit_btn" type="submit">
            Sign In
          </button>

          <div className="form-text forget">
            <Link to="/reset-password">
              <p>forget password?</p>
            </Link>
          </div>

          <div class="form-text register">
            <Link to="/register">
              <p>New to Saham? Register</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
