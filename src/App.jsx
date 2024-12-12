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
    // Function to check if all images are loaded
    const loadImages = async () => {
      try {
        // Get all images on the page
        const images = document.querySelectorAll("img");
        const imagePromises = Array.from(images).map((img) => {
          if (img.complete) {
            return Promise.resolve();
          } else {
            return new Promise((resolve) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", resolve); // Handle error cases as well
            });
          }
        });

        // Wait for all images to load
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <Router>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="SALU-CMS-FYP/" element={<Home />} />
            <Route path="SALU-CMS-FYP/faculty" element={<Faculty />} />
            <Route path="SALU-CMS-FYP/admissionForm" element={<Admission />} />
            <Route path="SALU-CMS-FYP/about" element={<About />} />
            <Route path="SALU-CMS-FYP/login" element={<Login />} />
            <Route path="SALU-CMS-FYP/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
};

export default App;
