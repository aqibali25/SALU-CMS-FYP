import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/LatestNews.css"; // Ensure you have the correct path to your CSS file

const LatestNewsCard = ({ icon, heading, date, text }) => {
  const truncatedText = text.length > 35 ? text.substring(0, 35) + "..." : text;

  return (
    <div className="latestNewsCard d-flex align-items-center gap-3">
      <div className="iconBox d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={icon} size="2x" className="icon" />
      </div>
      <div className="latestNewsText d-flex justify-content-center align-items-start flex-column">
        <h5>{heading}</h5>
        <small>{date}</small>
        <p>{truncatedText}</p>
      </div>
    </div>
  );
};

export default LatestNewsCard;
