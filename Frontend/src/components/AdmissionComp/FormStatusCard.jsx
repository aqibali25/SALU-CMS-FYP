import { useEffect, useState, useCallback, useRef } from "react";
import "../../styles/FormStatusCard.css";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAdmissionSchedule, {
  getAdmissionSchedules,
} from "../../store/useAdmissionScehedule.js";

const FormStatusCard = ({ title, icon, status, bgColor, url }) => {
  const { fetchAdmissionSchedules } = useAdmissionSchedule();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const navigate = useNavigate();
  const hasLogged = useRef(false);

  // Single useEffect for data fetching
  useEffect(() => {
    const loadAdmissionData = async () => {
      try {
        setIsLoading(true);
        await fetchAdmissionSchedules();
      } catch (error) {
        console.error("Error loading admission data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdmissionData();
  }, [fetchAdmissionSchedules]);

  // Get open admission schedules and check if admission is open
  useEffect(() => {
    const openAdmissionSchedules = getAdmissionSchedules()?.filter(
      (item) => item.status === "Open"
    );

    // Set isAdmissionOpen to true if there are any records with status "Open"
    const hasOpenAdmissions =
      openAdmissionSchedules && openAdmissionSchedules.length > 0;
    setIsAdmissionOpen(hasOpenAdmissions);

    // Debug log - only log once when data is loaded
    if (
      openAdmissionSchedules &&
      openAdmissionSchedules.length > 0 &&
      !hasLogged.current
    ) {
      hasLogged.current = true;
    }
  }, [isLoading]); // Run when loading state changes

  // Handle click for navigation
  const handleStatusClick = useCallback(() => {
    if (!isAdmissionOpen) {
      toast.warning("We are sorry, Admission Date has passed.", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    navigate(`/admissions/form/${url}`);
  }, [isAdmissionOpen, navigate, url]);

  if (isLoading) {
    return (
      <div className="formStatusCard formConitainer d-flex justify-content-between align-items-center">
        <div className="statusNames d-flex justify-content-center align-items-center">
          <p className="responsive-icon">{icon}</p>
          <h5 style={{ color: "#717070" }}>{title}</h5>
        </div>
        <div className="FormStatus d-flex justify-content-between align-items-center gap-5">
          <p className="mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="formStatusCard formConitainer d-flex justify-content-between align-items-center">
      <div className="statusNames d-flex justify-content-center align-items-center">
        <p className="responsive-icon">{icon}</p>
        <h5 style={{ color: "#717070" }}>{title}</h5>
      </div>
      <div
        className="FormStatus d-flex justify-content-between align-items-center gap-5"
        style={{ backgroundColor: bgColor }}
        onClick={handleStatusClick}
      >
        <p className="mt-3">{status}</p>
        <FaPencilAlt size={20} className="edit-icon" />
      </div>
    </div>
  );
};

export default FormStatusCard;
