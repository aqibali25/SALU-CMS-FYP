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

        // If no images found, stop loading
        if (images.length === 0) {
          setIsLoading(false);
          return;
        }

        const imagePromises = Array.from(images).map((img) => {
          return new Promise((resolve, reject) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => {
                console.warn(`Failed to load image: ${img.src}`);
                resolve(); // Resolve anyway to prevent hanging
              };
            }
          });
        });

        // Wait for all images to load with a timeout
        const timeoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            console.warn("Loading timeout reached");
            resolve();
          }, 5000); // 5 second timeout
        });

        await Promise.race([Promise.all(imagePromises), timeoutPromise]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    // Start loading check
    loadImages();

    // Fallback timeout to prevent infinite loading
    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // 8 second absolute maximum

    return () => clearTimeout(fallbackTimeout);
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
