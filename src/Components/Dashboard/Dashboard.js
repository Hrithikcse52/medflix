import React, { Children, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import LoginCard from "../Card/LoginCard/LoginCard";
import RegisterCard from "../Card/RegisterCard/RegisterCard";
import "./dashboard.css";
const Dashboard = () => {
  const history = useNavigate();
  const options = [
    {
      id: 1,
      option: "Active Patient",
      route: "patient",
    },
    {
      id: 2,
      option: "Logs",
      route: "logs",
    },
    {
      id: 3,
      option: "Prescption",
      route: "prescption",
    },
    {
      id: 4,
      option: "Report",
      route: "report",
    },
    {
      id: 5,
      option: "Analysis",
      route: "analysis",
    },
  ];
  const [page, setPage] = useState("");
  const handleChange = (data) => (e) => {
    console.log(e.target.innerText);
    console.log(data);
    history(data.route);
  };
  return (
    <>
      <div className="dashboard_container">
        <div className="sidebar">
          {options.map((data, index) => {
            return (
              <div key={index} onClick={handleChange(data)} className="item">
                {data.option}
              </div>
            );
          })}
        </div>
        <Routes>
          <Route path="patient" element={<LoginCard />} />
          <Route path="logs" element={<RegisterCard />} />
          <Route path="patient" element={<LoginCard />} />
          <Route path="patient" element={<LoginCard />} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
