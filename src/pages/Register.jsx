import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import Verify from "./Verify";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    pass: "",
    confirmPass: "",
    agreed: false,
    isAdmin: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type == "checkbox" ? checked : value,
    }));
  };

  const handlePartOne = async (e) => {
    e.preventDefault();

    const { email, pass, confirmPass } = formData;

    // Check if passwords match
    if (pass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    // Reset error state
    setError("");

    try {
      const response = await axios.post(`${apiBaseUrl}sendVerificationCode`, {
        email,
      });

      if (response.status >= 200 && response.status < 300) {
        setStep(2);
      } else {
        const data = await response.json();
        alert(JSON.stringify(data.error));
        console.error("Failed to send verification code");
      }
    } catch (error) {
      alert(JSON.stringify(error.response.data.error));
      console.log("Registration failed", error.response.data);
    }
  };

  return (
    <>
      {step === 1 ? (
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
              <h2>Registration</h2>
            </div>

            <form onSubmit={handlePartOne} className="form">
              <div class="input-group">
                <div>
                  <label htmlFor="first">
                    First Name
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="first"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="last">
                    Last Name
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="last"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="email">
                Email or Phone Number <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />

              <div class="input-group">
                <div>
                  <label htmlFor="pass">
                    Password <span>*</span>{" "}
                  </label>
                  <input
                    type="password"
                    name="pass"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPass">
                    Confirm Password <span>*</span>{" "}
                  </label>
                  <input
                    type="password"
                    name="confirmPass"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div class="form-text">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  required
                />
                <p>i agree to the term of service and privacy policy.</p>
                <Link to="/login">
                  <p>Already have an account</p>
                </Link>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button className="btn submit_btn" type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Verify
          email={formData.email}
          password={formData.pass}
          first={formData.first}
          last={formData.last}
          username={`${formData.first} ${formData.last}`}
          isAdmin={formData.isAdmin}
          setStep={setStep}
        />
      )}
    </>
  );
}

export default Register;
