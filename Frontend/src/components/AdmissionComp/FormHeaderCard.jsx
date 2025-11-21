import "../../styles/FormHeaderCard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFormStatus } from "../../contexts/AdmissionFormContext"; // Update the path to your context file
import Cookeies from "js-cookie";

const FormHeaderCard = () => {
  const { formStatus } = useFormStatus();
  const currentYear = new Date().getFullYear();
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="formHeaderCard formConitainer d-flex flex-wrap justify-content-around align-items-center float-end col-md-12 mx-auto p-4">
      <div className="formHeaderInner formHeaderIcon mb-3 mb-md-0">
        <i className="fa-solid fa-user fa-4x"></i>
      </div>
      <div
        className="formHeaderInner d-flex flex-column align-items-start text-center text-md-start mb-3 mb-md-0"
        style={{ maxWidth: "250px" }}
      >
        <h6>Personal Information</h6>
        <p>
          <label>Username:</label> {user.FULLNAME || "-----------------"}
        </p>
        <p>
          <label>CNIC:</label> {user.CNIC || "------------------"}
        </p>
        <p>
          <label>Email:</label> {user.EMAIL || "-----------"}
        </p>
      </div>
      <div
        className="formHeaderInner d-flex flex-column align-items-start text-center text-md-start mb-3 mb-md-0"
        style={{ maxWidth: "230px" }}
      >
        <h6>Program Group</h6>
        <p>
          Undergraduate Admission {currentYear + 1} (Ghotki-Campus) -
          Engineering
        </p>
        <p>Spring - {currentYear + 1}</p>
      </div>
      <div
        className="formHeaderInner"
        style={{ width: "100px", height: "100px" }}
      >
        <CircularProgressbar
          value={formStatus.percentage} // Use progress from the context
          text={`${formStatus.percentage}%`}
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
