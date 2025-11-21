import "../../styles/FormStatusCard.css";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";

const FormStatusCard = ({ title, icon, status, bgColor, url }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const currentDate = new Date();
  const startDate = new Date("2025-11-01");
  const endDate = new Date("2025-11-20");

  endDate.setHours(23, 59, 59, 999);

  const isAdmissionOpen = currentDate >= startDate && currentDate <= endDate;

  // Handle click for navigation
  const handleStatusClick = () => {
    if (!isAdmissionOpen) {
      toast.warning("We are sorry , Admission Date has passed.", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    // let formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
    // if (formattedTitle === "father-/-guardian-information") {
    //   formattedTitle = "father-information";
    // }
    navigate(`/admissions/form/${url}`);
  };

  return (
    <div className="formStatusCard formConitainer d-flex justify-content-between align-items-center">
      <div className="statusNames d-flex justify-content-center align-items-center">
        <p className="responsive-icon">{icon}</p>
        <h5 style={{ color: "#717070" }}>{title}</h5>
      </div>
      <div
        className="FormStatus d-flex justify-content-between align-items-center gap-5"
        style={{ backgroundColor: bgColor }}
        onClick={handleStatusClick} // Attach onClick handler
      >
        <p className="mt-3">{status}</p>
        <FaPencilAlt size={20} className="edit-icon" />
      </div>
    </div>
  );
};

export default FormStatusCard;
