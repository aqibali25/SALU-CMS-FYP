import React from "react";
import BackgroundImg from "../Sections/Slider/BackgroundImg";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";

const Home = () => {
  return (
    <section className="home">
      <BackgroundImg></BackgroundImg>
      <ImageSlider></ImageSlider>
    </section>
  );
};

export default Home;
