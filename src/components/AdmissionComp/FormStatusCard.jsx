import "../../styles/FormStatusCard.css";
import { FaPencilAlt } from "react-icons/fa";

const FormStatusCard = ({ title, icon, status }) => {
  return (
    <div className="formStatusCard d-flex justify-content-between align-items-center ">
      <div className="statusNames d-flex justify-content-center align-items-center">
        <p className="responsive-icon">{icon}</p>
        <h5 style={{ color: "#717070" }}>{title}</h5>
      </div>
      <div className="FormStatus d-flex justify-content-between align-items-center gap-5">
        <p>{status}</p>
        <FaPencilAlt size={30} className="edit-icon" />
      </div>
    </div>
  );
};

export default FormStatusCard;
