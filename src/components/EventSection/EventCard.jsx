import React from "react";
import "../../styles/Events.css"; // Ensure you have the correct path to your CSS file

const EventCard = ({ date, title, description, time, location }) => {
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="eventCard d-flex gap-3 align-items-center">
      <div className="iconBox d-flex flex-column  align-items-center">
        <strong className="date">{date.split(" ")[0]}</strong>
        <strong className="month">{date.split(" ")[1]}</strong>
        <div className="eventCardFooter"></div>
      </div>
      <div className="eventCardText">
        <h5 className="eventTitle">{title}</h5>
        <p className="eventDescription mb-1">{truncateText(description, 35)}</p>
        <small htmlFor="date&location">
          {time} | {location}
        </small>
      </div>
    </div>
  );
};

export default EventCard;
