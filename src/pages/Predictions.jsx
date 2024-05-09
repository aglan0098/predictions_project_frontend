import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { companies } from "../data/companies";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Predictions() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  const [logo, setLogo] = useState({});

  const handleCompanySelect = (company) => {
    setSelectedCompany(company.name);
    setLogo(company.logo);
  };

  const handleSearch = async () => {
    if (!selectedCompany || !selectedMonth || !selectedYear) {
      alert("Please select a company, month, and year.");
      return;
    }

    try {
      // Fetch the data from the backend
      const response = await axios.get(`${apiBaseUrl}company-data`, {
        params: {
          name: selectedCompany,
          month: selectedMonth,
          year: selectedYear,
        },
      });

      // Navigate to the details page with the fetched data
      navigate("/company-details", {
        state: {
          companyData: response.data.data,
          logo: logo,
          date: { selectedMonth, selectedYear },
        },
      });
    } catch (error) {
      console.error("Error fetching company data:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="predictions page">
      <div>
        <h4>Past predictions generated:</h4>
        <p>Select corporation:</p>

        <div className="corporations">
          {companies.map((company) => (
            <div
              className="cor-item"
              onClick={() => handleCompanySelect(company)}
              key={company.name}
            >
              <img src={company.logo} alt={`${company.name} Logo`} />
            </div>
          ))}
        </div>

        <p>Select Date:-</p>
        <div class="date">
          <div class="select-wrapper">
            <select
              id="mySelect"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="" disabled selected hidden className="first-child">
                Select Month
              </option>
              <option value="January">January</option>{" "}
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
          </div>

          <div className="select-wrapper">
            <select
              id="mySelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="" disabled selected hidden>
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
        </div>

        <button className="btn search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Predictions;
