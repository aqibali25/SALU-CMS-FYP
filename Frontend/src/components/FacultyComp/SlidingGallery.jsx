import React, { useState, useEffect, useRef } from "react";
import ImageContainer from "./ImageContainer";
import "../../pages/Faculty/Faculty.css";

const SlidingGallery = ({ images, isloading, onSelect }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4); // Default number of visible images
  const sliderRef = useRef(null);

  // Calculate the number of visible images based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width > 880) {
        setVisibleCount(4);
      } else if (width > 600) {
        setVisibleCount(3);
      } else if (width > 480) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount(); // Initial call
    window.addEventListener("resize", updateVisibleCount); // Update on resize

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slide = () => {
      if (!isPaused) {
        const firstChild = slider.firstElementChild;
        const itemWidth = firstChild.offsetWidth; // Get the width of one image container
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${itemWidth}px)`;

        const handleTransitionEnd = () => {
          slider.style.transition = "none";
          slider.style.transform = "translateX(0)";
          slider.appendChild(firstChild); // Move the first image to the end
          slider.removeEventListener("transitionend", handleTransitionEnd);
        };

        slider.addEventListener("transitionend", handleTransitionEnd);
      }
    };

    const interval = setInterval(slide, 2000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [isPaused, visibleCount]);

  return (
    <div
      className="gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider" ref={sliderRef}>
        {images.map((image) => (
          <ImageContainer
            key={image.id}
            image={image}
            visibleCount={visibleCount}
            isloading={isloading}
            onClick={() => onSelect(image)} // Pass selected image to parent
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingGallery;
