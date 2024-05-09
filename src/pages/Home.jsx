import React, { useEffect, useState } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

import { companies } from "../data/companies";
import img from "../assets/background.png";

function Home() {
  const [closePrices, setClosePrices] = useState([]);

  useEffect(() => {
    const fetchClosePrices = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}current-prices`);
        setClosePrices(response.data.closePrices);
      } catch (error) {
        console.error("Error fetching close prices:", error);
        alert("Failed to fetch close prices. Please try again later.");
      }
    };

    fetchClosePrices();
  }, []);

  // Get the close price for a given company
  const getClosePrice = (companyName) => {
    const company = closePrices.find(
      (price) => price.companyName === companyName
    );
    return company ? company.closePrice : "No data";
  };

  return (
    <div className="home_container">
      <div className="welcome">
        <div className="content">
          <h2>Welcome to Saham,</h2>
          <p>
            Your ultimate prediction system tailored to guide your investments
            in Saudi Arabian industrial companies. With Saham, unlock insightful
            forecasts and strategic insights to navigate the dynamic landscape
            of the Saudi Arabian market !!
          </p>
        </div>
        <div className="img">
          <img src={img} alt="Welcome Image" />
        </div>
      </div>

      <p className="corporations_p">
        January Stock Price Predictions: Anticipated trends for 2024.
      </p>
      <div className="corporations">
        {companies.map((company) => (
          <div className="home-cor-item" key={company.name}>
            <img src={company.logo} alt={`${company.name} Logo`} />
            <p className="current-price">{getClosePrice(company.name)} SAR</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
