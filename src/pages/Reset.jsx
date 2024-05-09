import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Reset() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, newPassword, confirmNewPassword } = formData;

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    // Reset error state
    setError("");

    try {
      const response = await axios.post(`${apiBaseUrl}reset-password`, {
        email,
        password: newPassword,
      });
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to reset password", error.response.data);
    }
  };

  return (
    <div className="box-container">
      <div className="box">
        <div class="logo">
          <img src={logo} alt="logo" />
          <h2>Reset Password</h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="pass">
            Email <span style={{ color: "red", fontWeight: "bold" }}>*</span>{" "}
          </label>
          <input name="email" type="email" onChange={handleChange} />

          <label htmlFor="pass">
            New Password{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>*</span>{" "}
          </label>
          <input name="newPassword" type="password" onChange={handleChange} />

          <label htmlFor="pass">
            Confirm New Password{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>*</span>{" "}
          </label>
          <input
            name="confirmNewPassword"
            type="password"
            onChange={handleChange}
          />

          {error && <div className="error-message">{error}</div>}

          <button className="btn submit_btn" type="submit">
            Reset
          </button>
        </form>

        <Link to="/">
          <button className="btn back_btn">Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Reset;
