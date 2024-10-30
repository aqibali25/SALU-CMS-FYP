import "../../styles/FormHeaderCard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FormHeaderCard = () => {
  const currentYear = new Date().getFullYear();
  const percentage = 25; // Set your dynamic percentage here

  return (
    <div
      className="formHeaderCard d-flex flex-wrap justify-content-around align-items-center float-end bg-light col-md-10  mx-auto p-3"
      style={{ minHeight: "150px" }}
    >
      <div className="formHeaderInner formHeaderIcon mb-3 mb-md-0">
        <i className="fa-solid fa-user fa-4x"></i>
      </div>
      <div
        className="formHeaderInner d-flex flex-column align-items-start text-center text-md-start mb-3 mb-md-0"
        style={{ maxWidth: "250px" }}
      >
        <h6>Personal Information</h6>
        <p>
          <label>Tracking ID:</label> 02-2023-1-00058898
        </p>
        <p>
          <label>Username:</label> Muhammad Sahil
        </p>
        <p>
          <label>Phone No:</label> 03100000000
        </p>
      </div>
      <div
        className="formHeaderInner d-flex flex-column align-items-start text-center text-md-start mb-3 mb-md-0"
        style={{ maxWidth: "230px" }}
      >
        <h6>Program Group</h6>
        <p>
          Undergraduate Admission {currentYear} (Main and Sub-Campuses) -
          Engineering
        </p>
        <p>Fall - {currentYear}</p>
      </div>
      <div
        className="formHeaderInner"
        style={{ width: "80px", height: "80px" }}
      >
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: "#e5b300",
            textColor: "#6c757d",
            trailColor: "#e0e0e0",
          })}
        />
      </div>
    </div>
  );
};

export default FormHeaderCard;
