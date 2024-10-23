import "./Background.css";
import BackgroundImage from "../../../assets/Background.jpg";

const BackgroundImg = ({ heading1, highlight, heading2, para }) => {
  return (
    <section className="section-1 position-relative d-flex justify-content-center align-items-center flex-column">
      <img src={BackgroundImage} alt="Background" className="w-100 h-100" />
      <div className="backgroundImgText position-absolute d-flex flex-column justify-content-center align-items-center text-white text-center">
        <h2>
          {heading1} <span className="highlight">{highlight}</span>
          {heading2}
        </h2>
        <p className="highlightText">{para}</p>
      </div>
    </section>
  );
};

export default BackgroundImg;
