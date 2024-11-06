import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import "../../styles/LatestNews.css";
import LatestNewsCard from "./LatestNewsCard";

const LatestNews = ({ latestNewsCards }) => {
  return (
    <div className="latestNews">
      <SectionTitle label={"Latest News"} />
      <div className="latestNewsInner d-flex justify-content-center align-content-center flex-column gap-4">
        {latestNewsCards.map((newsCard, index) => (
          <LatestNewsCard
            key={index}
            icon={newsCard.icon}
            heading={newsCard.heading}
            date={newsCard.date}
            text={newsCard.text}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
