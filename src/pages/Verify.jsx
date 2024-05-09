import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "../../context/AuthContext";
import logo from "../assets/logo.jpeg";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Verify({ email, password, first, last, username, isAdmin, setStep }) {
  const [verificationCode, setVerificationCode] = useState("");
  const { setIsAuthenticated } = useAuth();
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiBaseUrl}register`, {
        email,
        password: password,
        first,
        last,
        username,
        isAdmin,
        verificationCode,
      });

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        setUserData(response.data.user);
        navigate("/home");
      } else {
        const data = await response.json();
        alert(JSON.stringify(data.error));
        console.error("Failed to Register");
      }
    } catch (error) {
      console.log("Verification failed");
    }
  };

  const back = () => {
    setStep(1);
  };

  return (
    <div className="box-container">
      <div className="box">
        <div class="logo">
          <img src={logo} alt="logo" />
          <h2>Verification</h2>
        </div>

        <form className="form verify-form" onSubmit={handleSubmit}>
          <label htmlFor="pass">
            Verification code{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>*</span>{" "}
          </label>
          <input type="text" value={verificationCode} onChange={handleChange} />

          <button className="btn submit_btn" type="submit">
            Verifiy
          </button>
        </form>

        <button className="btn back_btn" onClick={back}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Verify;
