import React from "react";
import BackgroundImg from "../Sections/Slider/BackgroundImg";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import EventSection from "../Sections/Events/EventSection";
import Courses from "../Sections/Courses/Courses";

const Home = () => {
  return (
    <section className="home">
      <BackgroundImg
        heading1={"Find Your "}
        highlight={"Future"}
        heading2={"Today!"}
        para={"The Ultimate Guide to Universities Worldwide"}
      ></BackgroundImg>
      <EventSection></EventSection>
      <ImageSlider></ImageSlider>
      <Courses></Courses>
    </section>
  );
};

export default Home;
