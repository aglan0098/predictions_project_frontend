import React, { useState } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
  const [formData, setFormData] = useState({
    companyName: "",
    month: "",
    year: "",
    closePrice: "",
    openPrice: "",
    volume: "",
    highPrice: "",
    lowPrice: "",
    adjustClosePrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiBaseUrl}company`, {
        name: formData.companyName,
        month: formData.month,
        year: formData.year,
        close_price: formData.closePrice,
        open_price: formData.openPrice,
        volume: formData.volume,
        high_price: formData.highPrice,
        low_price: formData.lowPrice,
        adjust_close_price: formData.adjustClosePrice,
      });

      if (response.status == 200) {
        alert(response.data.message);
        setFormData({
          companyName: "",
          month: "",
          year: "",
          closePrice: "",
          openPrice: "",
          volume: "",
          highPrice: "",
          lowPrice: "",
          adjustClosePrice: "",
        });
      }
    } catch (error) {
      console.error("Error adding company data:", error.message);
    }
  };

  return (
    <div className="dashboard page">
      <h2 className="dash-title">Administration Input:</h2>
      <form onSubmit={addData}>
        <div className="inputs">
          <div className="d-flex">
            <select
              id="companyName"
              className="select-input"
              name="companyName"
              onChange={handleInputChange}
              value={formData.companyName}
            >
              <option value="" disabled hidden>
                Select Company
              </option>
              <option value="tasne3">Tasne3</option>
              <option value="sabic">Sabic</option>
              <option value="maaden">Maaden</option>
              <option value="advanced">Advanced</option>
              <option value="electricity">Electricity</option>
              <option value="aramco">Aramco</option>
            </select>

            <select
              id="month"
              className="select-input"
              name="month"
              onChange={handleInputChange}
              value={formData.month}
            >
              <option value="" disabled hidden>
                Select Month
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <select
              id="year"
              className="select-input"
              name="year"
              onChange={handleInputChange}
              value={formData.year}
            >
              <option value="" disabled hidden>
                Select Year
              </option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
            </select>
          </div>

          <div className="d-flex">
            <input
              type="text"
              placeholder="Close price"
              name="closePrice"
              onChange={handleInputChange}
              value={formData.closePrice}
            />
            <input
              type="text"
              placeholder="Open Price"
              name="openPrice"
              onChange={handleInputChange}
              value={formData.openPrice}
            />
            <input
              type="text"
              placeholder="Volume"
              name="volume"
              onChange={handleInputChange}
              value={formData.volume}
            />
          </div>

          <div className="d-flex">
            <input
              type="text"
              placeholder="High Price"
              name="highPrice"
              onChange={handleInputChange}
              value={formData.highPrice}
            />
            <input
              type="text"
              placeholder="Low Price"
              name="lowPrice"
              onChange={handleInputChange}
              value={formData.lowPrice}
            />
            <input
              type="text"
              placeholder="Adjust Close Price"
              name="adjustClosePrice"
              onChange={handleInputChange}
              value={formData.adjustClosePrice}
            />
          </div>
        </div>

        <button className="btn" type="submit">
          Insert
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
