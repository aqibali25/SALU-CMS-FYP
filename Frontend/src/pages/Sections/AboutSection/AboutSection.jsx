import { Link } from "react-router-dom";
import AboutCampusImage from "../../../assets/AboutCampusImage.png";
import "./AboutCampus.css";

const AboutSection = () => {
  const aboutText = `Ghotki Campus is located in the heart of the city, offering students
    an unparalleled opportunity to study at a prestigious university. The
    campus boasts a rich and vibrant atmosphere, allowing students to
    engage in meaningful discussions and collaborate with peers and others
    in the community and providing information about the University and
    its members and members of the community Ghotki Campus is located in the heart of the city `;

  const maxChars = 450; // Set your desired character limit

  return (
    <section className="aboutSection">
      <div className="aboutImage">
        <img src={AboutCampusImage} alt="About Image" />
      </div>
      <div className="aboutText">
        <h2 className="heading">About Campus</h2>
        <p>
          {aboutText.length > maxChars
            ? aboutText.slice(0, maxChars) + "..."
            : aboutText}
        </p>
        <div className="buttonContainer d-flex mt-4">
          <Link to="/SALU-CMS-FYP/about" className="button buttonNotFilled">
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
