import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import Faculty from "./pages/Faculty/Faculty.jsx";
import Admission from "./pages/Admission/Admission.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Loader from "./components/Loader/Loader.jsx";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImagesAndIcons = () => {
      // Get all images on the page
      const images = document.getElementsByTagName("img");
      const icons = document.getElementsByTagName("i");

      // Create an array of promises for image loading
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", resolve);
        });
      });

      // Create promises for icon font loading
      const iconPromises = Array.from(icons).map(() => {
        return document.fonts.ready;
      });

      // Wait for window load and all resources
      window.addEventListener("load", () => {
        Promise.all([...imagePromises, ...iconPromises])
          .then(() => {
            setTimeout(() => setIsLoading(false), 500); // Add small delay to ensure everything is rendered
          })
          .catch(() => {
            setIsLoading(false);
          });
      });
    };

    loadImagesAndIcons();

    return () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="SALU-CMS-FYP/" element={<Home />} />
        <Route path="SALU-CMS-FYP/faculty" element={<Faculty />} />
        <Route path="SALU-CMS-FYP/admissionForm" element={<Admission />} />
        <Route path="SALU-CMS-FYP/about" element={<About />} />
        <Route path="SALU-CMS-FYP/login" element={<Login />} />
        <Route path="SALU-CMS-FYP/signup" element={<Signup />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;
