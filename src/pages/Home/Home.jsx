import React from "react";
import BackgroundImg from "../Sections/BackgroundImage/BackgroundImg";
import "./Home.css";
import Courses from "../Sections/Courses/Courses";
import ImageSlider from "../Sections/ImageSlider/ImageSlider";
import EventSection from "../Sections/Events/EventSection";
import MissionAndVision from "../Sections/MissionAndVision/MissionAndVision";
import AboutSection from "../Sections/AboutSection/AboutSection";

const Home = () => {
  return (
    <section className="home">
      <BackgroundImg
        heading1={"Find Your "}
        highlight={"Future"}
        heading2={"Today!"}
        para={"The Ultimate Guide to Universities Worldwide"}
      ></BackgroundImg>
      <MissionAndVision></MissionAndVision>
      <hr className="home-hr" />
      <EventSection></EventSection>
      <hr className="home-hr" />
      <ImageSlider></ImageSlider>
      <hr className="home-hr" />
      <Courses></Courses>
      <hr className="home-hr" />
      <AboutSection></AboutSection>
    </section>
  );
};

export default Home;
