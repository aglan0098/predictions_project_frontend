import React, { useState } from "react";
import { useAuth, useUser } from "../../context/AuthContext";
import logo from "../assets/logo.jpeg";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Profile() {
  const { setIsAuthenticated } = useAuth();
  const { userData } = useUser();

  const [formData, setFormData] = useState({
    userId: userData._id,
    first: userData.first,
    last: userData.last,
    email: userData.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiBaseUrl}update`, formData);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      alert("your data updated successfully");
    } catch (error) {
      if (error.response) {
        console.error("Failed to update profile", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
  };

  return (
    <div className="profile page">
      <div className="box">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div class="input-group">
            <div>
              <label htmlFor="first">First Name</label>
              <input
                type="text"
                name="first"
                value={formData.first}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="last">Last Name</label>
              <input
                type="text"
                name="last"
                value={formData.last}
                onChange={handleChange}
              />
            </div>
          </div>

          <label htmlFor="email">Email </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <button className="btn save-btn" type="submit">
            Save Changes
          </button>
        </form>
        <button className="signout-btn" onClick={signout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
