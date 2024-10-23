import React from "react";
import BackgroundImg from "../Sections/BackgroundImage/BackgroundImg";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
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
      <ImageSlider></ImageSlider>
      <Courses></Courses>
    </section>
  );
};

export default Home;
