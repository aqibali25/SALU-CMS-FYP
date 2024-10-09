import "./Background.css";
import BackgroundImage from "../../../assets/Background.jpg";

const BackgroundImg = () => {
  return (
    <section className="section-1 position-relative d-flex justify-content-center align-items-center flex-column">
      <img src={BackgroundImage} alt="Background" className="w-100 h-100" />
      <div className="backgroundImgText position-absolute d-flex flex-column justify-content-center align-items-center text-white text-center">
        <h2>
          Find Your <span className="highlight">Future</span> Today!
        </h2>
        <p className="highlightText">
          The Ultimate Guide to Universities Worldwide
        </p>
      </div>
    </section>
  );
};

export default BackgroundImg;
