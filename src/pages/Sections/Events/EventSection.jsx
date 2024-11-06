import React from "react";
import "./EventSection.css";
import LatestNews from "../../../components/EventSection/LatestNews";
import Events from "../../../components/EventSection/Events";

import {
  faAward,
  faMagnifyingGlass,
  faFileAudio,
} from "@fortawesome/free-solid-svg-icons";

const latestNewsCards = [
  {
    icon: faAward,
    heading: "Merit Lists - Admission 2023",
    date: "January 25, 2023",
    text: "Merit Lists 2023 Download Last Date...",
  },
  {
    icon: faMagnifyingGlass,
    heading: "Press Release: Job Hunting Workshop",
    date: "January 25, 2023",
    text: "QEC Department Of Shah Abdul....",
  },
  {
    icon: faFileAudio,
    heading: "Press Release: Incharge DG(P&D) HEC and Project Director...",
    date: "January 25, 2023",
    text: "Merit Lists 2023 Download Last Date...",
  },
];
const EventSection = () => {
  return (
    <>
      <section className="event-section container">
        <LatestNews latestNewsCards={latestNewsCards}></LatestNews>
        <Events></Events>
      </section>
    </>
  );
};

export default EventSection;
