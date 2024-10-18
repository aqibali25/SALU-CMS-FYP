import React from "react";
import "./DateCard.css";

const DateCard = ({ date, monthYear, title, description }) => (
  <div className="post">
    <div className="date-box">
      <span>{date}</span>
      <small>{monthYear}</small>
    </div>
    <div className="content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default DateCard;
