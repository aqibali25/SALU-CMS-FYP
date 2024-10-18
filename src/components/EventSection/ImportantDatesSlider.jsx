import React from "react";
import { Carousel } from "react-bootstrap";
import DateCard from "./DateCard";
import "./ImportantDatesSlider.css";

const ImportantDatesSlider = ({ dates }) => {
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return { date: day, monthYear: `${month}.${year.slice(-2)}` };
  };

  return (
    <Carousel>
      {dates.map((event, index) => {
        if (index % 2 !== 0) return null; // Skip odd indices

        const event1 = dates[index];
        const event2 = dates[index + 1];

        const { date: date1, monthYear: monthYear1 } = formatDate(event1.date);
        const { date: date2, monthYear: monthYear2 } = event2
          ? formatDate(event2.date)
          : {};

        return (
          <Carousel.Item key={index}>
            <div className="d-flex flex-column align-items-center">
              <DateCard
                date={date1}
                monthYear={monthYear1}
                title={event1.heading}
                description={event1.description}
              />
              {event2 && (
                <DateCard
                  date={date2}
                  monthYear={monthYear2}
                  title={event2.heading}
                  description={event2.description}
                />
              )}
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default ImportantDatesSlider;
