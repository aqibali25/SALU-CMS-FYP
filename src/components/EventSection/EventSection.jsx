import React from "react";
import "../../styles/EventSection.css";
import UpcomingEvents from "../../Components/EventSection/UpcomingEvents";
import ImportantDatesSlider from "../../Components/EventSection/ImportantDatesSlider";
import UmcomingEventImage from "../../assets/UmcomingEventImage.jpg";
import SectionTitle from "../SectionTitle/SectionTitle";

const EventDates = [
  {
    image: UmcomingEventImage,
    date: "00-000-00",
    heading: "Scholarship test",
    description:
      "Your upcoming test is around the corner! Ensure you're well-prepared to achieve academic success.",
  },
  {
    image: UmcomingEventImage,
    date: "00-000-00",
    heading: "Scholarship test",
    description:
      "Your upcoming test is around the corner! Ensure you're well-prepared to achieve academic success.",
  },
  {
    image: UmcomingEventImage,
    date: "00-000-00",
    heading: "Scholarship test",
    description:
      "Your upcoming test is around the corner! Ensure you're well-prepared to achieve academic success.",
  },
  {
    image: UmcomingEventImage,
    date: "00-000-00",
    heading: "Scholarship test",
    description:
      "Your upcoming test is around the corner! Ensure you're well-prepared to achieve academic success.",
  },
];
const EventSection = ({}) => {
  return (
    <>
      <SectionTitle label={"Important Events"}></SectionTitle>
      <section className="event-section container">
        <UpcomingEvents event={EventDates[0]} />
        <ImportantDatesSlider dates={EventDates} />
      </section>
    </>
  );
};

export default EventSection;
