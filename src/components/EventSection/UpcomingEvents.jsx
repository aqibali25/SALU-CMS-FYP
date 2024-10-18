import React from "react";
import "../../styles/UpcomingEvents.css";

const UpcomingEvents = ({ event }) => {
  return (
    <div className="eventImageContainer">
      <img src={event.image} alt={event.heading} />
      <span>{event.date}</span>
      <div className="text">
        <h3>
          {event.heading}
          <p>{event.description}</p>
        </h3>
      </div>
    </div>
  );
};
export default UpcomingEvents;
