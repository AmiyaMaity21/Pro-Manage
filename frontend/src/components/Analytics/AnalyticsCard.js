import React from "react";

const AnalyticsCard = ({ tasks }) => {
  return (
    <div className="analytics-card">
      {tasks.map((task, index) => (
        <div key={index} className="analytics-card-item">
          <li>{task.title}</li>
          <p>{task.count}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCard;
