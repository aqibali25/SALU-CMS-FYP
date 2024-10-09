import React, { useEffect } from "react";
import BackgroundImg from "../Sections/Slider/BackgroundImg";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <section className="home">
      <BackgroundImg></BackgroundImg>
    </section>
  );
};

export default Home;
