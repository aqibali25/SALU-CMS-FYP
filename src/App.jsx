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
        // Get all images in the document
        const images = document.querySelectorAll("img");

        // If no images, set loading to false immediately
        if (images.length === 0) {
          setIsLoading(false);
          return;
        }

        // Create promises for images to load
        const imagePromises = Array.from(images).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = () => {
                console.warn(`Failed to load image: ${img.src}`);
                resolve(); // Resolve anyway to avoid blocking
              };
            }
          });
        });

        // Add a timeout to avoid hanging
        const timeoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            console.warn("Loading timeout reached for assets.");
            resolve();
          }, 5000); // 5 seconds timeout
        });

        // Wait for either all images to load or timeout to occur
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
