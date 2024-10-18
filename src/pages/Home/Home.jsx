import React from "react";
import BackgroundImg from "../Sections/Slider/BackgroundImg";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import EventSection from "../../components/EventSection/EventSection";

const Home = () => {
  return (
    <section className="home">
      <BackgroundImg></BackgroundImg>
      <EventSection></EventSection>
      <ImageSlider></ImageSlider>
    </section>
  );
};

export default Home;
