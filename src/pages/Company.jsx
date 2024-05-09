import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import prediction from "../assets/prediction.png";

function Company() {
  const location = useLocation();
  const { logo } = location.state;
  const { companyData } = location.state;
  const { date } = location.state;

  if (!companyData) {
    return <p className="loading">Loading...</p>;
  }

  const getMonthNumber = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const normalizedMonthName = monthName.trim().toLowerCase();

    const index = months.findIndex(
      (m) => m.toLowerCase() === normalizedMonthName
    );

    if (index === -1) {
      throw new Error("Invalid month name");
    }

    return index + 1;
  };

  const [monthNumber, setMonthNumber] = useState(null);

  useEffect(() => {
    setMonthNumber(getMonthNumber(date.selectedMonth));
  }, []);

  return (
    <div className="company_container page">
      <h2>Predictions:</h2>
      <p>Disclaimer: The prices might not be 100% accurate</p>

      <div className="data">
        <div className="prices">
          <div className="d-flex">
            <div className="price">
              <div className="price_name">Company</div>
              <img
                src={`${logo}`}
                alt="company logo"
                className="company_logo"
              />
            </div>
            <div className="price">
              <div className="price_name">Predicted Date</div>
              {`30 / ${monthNumber} / ${date.selectedYear}`}
            </div>
          </div>
          <div className="price">
            <div className="price_name">Close Price</div>
            {companyData.close_price}
            <span className="sar">SAR</span>
          </div>
          <div className="price">
            <div className="price_name">Open Price</div>
            {companyData.open_price}
            <span className="sar">SAR</span>
          </div>
          <div className="price">
            <div className="price_name">Volume</div>
            {companyData.volume}
          </div>
        </div>

        <div className="graph">
          <div className="img">
            <img src={prediction} alt="prediction_img" />
          </div>
          <div className="d-flex">
            <div className="price">
              <div className="price_name">Highest Price </div>
              <div style={{ color: "green" }}>
                {companyData.high_price}
                <span className="sar">SAR</span>
              </div>
            </div>
            <div className="price">
              <div className="price_name">Low Price </div>
              <div style={{ color: "red" }}>
                {companyData.low_price}
                <span className="sar">SAR</span>
              </div>
            </div>
            <div className="price">
              <div className="price_name">Adjusted Close Price </div>
              {companyData.adjust_close_price}
              <span className="sar">SAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
