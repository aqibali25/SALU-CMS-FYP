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
        // Select all images in the document
        const images = document.querySelectorAll("img");

        if (images.length === 0) {
          // No images to load, set loading to false
          setIsLoading(false);
          return;
        }

        // Create an array of promises for all images
        const imagePromises = Array.from(images).map((img) => {
          return new Promise((resolve, reject) => {
            if (img.complete) {
              // Check if the image is already loaded or failed
              if (img.naturalWidth > 0) {
                resolve();
              } else {
                reject(new Error(`Image failed to load: ${img.src}`));
              }
            } else {
              img.onload = resolve; // Resolve when image loads
              img.onerror = () =>
                reject(new Error(`Image failed to load: ${img.src}`));
            }
          });
        });

        // Add a timeout as a safety mechanism
        const timeoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            console.warn("Loading timeout reached. Proceeding...");
            resolve();
          }, 10000); // 10 seconds timeout
        });

        // Wait for all images to load or timeout
        await Promise.race([Promise.all(imagePromises), timeoutPromise]);

        // Set loading to false after everything is done
        setIsLoading(false);
      } catch (error) {
        console.error("Error during asset loading:", error);
        setIsLoading(false); // Ensure the loader is disabled even on error
      }
    };

    loadAssets();
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
