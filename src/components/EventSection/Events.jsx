import React from "react";
import { Carousel } from "react-bootstrap";
import SectionTitle from "../SectionTitle/SectionTitle";
import EventCard from "./EventCard";
import "../../styles/Events.css";

const Events = () => {
  const eventCardsData = [
    {
      date: "08 March",
      title: "Job Hunting Workshop",
      description:
        "A practical Workshop for hands-on sessions on Resume & Cover Letter Writing, Career Development & Interview Skills. Followed by Mock...",
      time: "9:30 am - 2:00 pm",
      location: "LAB B, SALU GHOTKI CAMPUS",
    },
    {
      date: "08 March",
      title: "Software Exhibition",
      description:
        "Department of Computer Science, Shah Abdul Latif University, Ghotki Campus, organized a Software Exhibition in accordance with the Final...",
      time: "9:30 am - 2:00 pm",
      location: "SALU GHOTKI CAMPUS",
    },
    {
      date: "08 March",
      title: "Job Hunting Workshop",
      description:
        "A practical Workshop for hands-on sessions on Resume & Cover Letter Writing, Career Development & Interview Skills. Followed by Mock...",
      time: "9:30 am - 2:00 pm",
      location: "LAB B, SALU GHOTKI CAMPUS",
    },
    {
      date: "08 March",
      title: "Software Exhibition",
      description:
        "Department of Computer Science, Shah Abdul Latif University, Ghotki Campus, organized a Software Exhibition in accordance with the Final...",
      time: "9:30 am - 2:00 pm",
      location: "SALU GHOTKI CAMPUS",
    },
    {
      date: "08 March",
      title: "Job Hunting Workshop",
      description:
        "A practical Workshop for hands-on sessions on Resume & Cover Letter Writing, Career Development & Interview Skills. Followed by Mock...",
      time: "9:30 am - 2:00 pm",
      location: "LAB B, SALU GHOTKI CAMPUS",
    },
    {
      date: "08 March",
      title: "Software Exhibition",
      description:
        "Department of Computer Science, Shah Abdul Latif University, Ghotki Campus, organized a Software Exhibition in accordance with the Final...",
      time: "9:30 am - 2:00 pm",
      location: "SALU GHOTKI CAMPUS",
    },
    // Add more event objects as needed
  ];

  // Group events into pairs for displaying two per slide
  const groupedEvents = [];
  for (let i = 0; i < eventCardsData.length; i += 2) {
    groupedEvents.push(eventCardsData.slice(i, i + 2));
  }

  return (
    <div className="events">
      <SectionTitle label={"Events"} />
      <Carousel
        indicators={true}
        controls={false}
        interval={3000}
        className="events-carousel"
        style={{ width: "100%" }}
      >
        {groupedEvents.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex flex-column align-items-center gap-4 mx-5">
              {group.map((event, idx) => (
                <EventCard
                  key={idx}
                  date={event.date}
                  title={event.title}
                  description={event.description}
                  time={event.time}
                  location={event.location}
                />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Events;
