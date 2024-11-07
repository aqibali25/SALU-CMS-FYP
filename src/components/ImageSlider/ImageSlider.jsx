import React from "react";
import "./ImageSlider.css"; // Import the CSS file
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

//import images
// import Image1 from "../../assets/TrandngImages/Image1.jpg";
import Image1 from "../../../assets/TrandngImages/Image1.jpg";
import Image2 from "../../../assets/TrandngImages/Image2.jpg";
import Image3 from "../../../assets/TrandngImages/Image3.jpg";
import Image4 from "../../../assets/TrandngImages/Image4.jpg";
import Image5 from "../../../assets/TrandngImages/Image5.jpg";

const images = [Image1, Image2, Image3, Image4, Image5];

const ImageSlider = () => {
  return (
    <sectoion className="imageSlider mb-5">
      <SectionTitle label={"Tranding @SALU GC"}></SectionTitle>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{ height: "100%" }}>
          {images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
              style={{ height: "100%" }} // Ensure items fill the container
            >
              <img
                src={image}
                className="d-block w-100"
                alt={`Image ${index + 1}`}
                style={{ height: "100%", objectFit: "cover" }} // Cover the area without distortion
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </sectoion>
  );
};

export default ImageSlider;
