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
    // Function to check if all images and icons are loaded
    const loadImagesAndIcons = async () => {
      const images = document.getElementsByTagName("img");
      const icons = document.getElementsByTagName("i"); // Get all icon elements

      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Handle error cases as well
        });
      });

      const iconPromises = Array.from(icons).map((icon) => {
        // For icons, we'll check if they're fully rendered
        return new Promise((resolve) => {
          if (window.getComputedStyle(icon).fontFamily !== "") {
            resolve();
          } else {
            // If font isn't loaded yet, wait for it
            document.fonts.ready.then(resolve);
          }
        });
      });

      // Wait for both images and icons to load
      await Promise.all([...imagePromises, ...iconPromises]);
      setIsLoading(false);
    };

    window.addEventListener("load", loadImagesAndIcons);
    return () => window.removeEventListener("load", loadImagesAndIcons);
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
