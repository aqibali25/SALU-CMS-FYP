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
    const loadAssets = async () => {
      try {
        // Wait a bit to ensure DOM is fully loaded
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get all images in the document
        const images = document.querySelectorAll("img");

        // Create promises for images to load
        const imagePromises = Array.from(images).map((img) => {
          return new Promise((resolve, reject) => {
            // For already loaded images
            if (img.complete) {
              // Still check if there was an error
              if (img.naturalWidth === 0) {
                reject(new Error(`Failed to load image: ${img.src}`));
              } else {
                resolve();
              }
            } else {
              // For images still loading
              img.onload = resolve;
              img.onerror = () =>
                reject(new Error(`Failed to load image: ${img.src}`));
            }
          });
        });

        // Add a longer timeout to ensure images have time to load
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Loading timeout reached for assets."));
          }, 10000); // 10 seconds timeout
        });

        // Wait for all images to load or timeout
        await Promise.race([Promise.all(imagePromises), timeoutPromise]);
      } catch (error) {
        console.error("Error during asset loading:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  return (
    <Router>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="SALU-CMS-FYP/" element={<Home />} />
            <Route path="SALU-CMS-FYP/faculty" element={<Faculty />} />
            <Route path="SALU-CMS-FYP/admissionForm" element={<Admission />} />
            <Route path="SALU-CMS-FYP/about" element={<About />} />
            <Route path="SALU-CMS-FYP/login" element={<Login />} />
            <Route path="SALU-CMS-FYP/signup" element={<Signup />} />
          </Routes>{" "}
          <Footer />
        </>
      )}
    </Router>
  );
};

export default App;
