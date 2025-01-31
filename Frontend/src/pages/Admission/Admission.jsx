import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Admission.css";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import AdmissionHeader from "../../components/AdmissionComp/otherAdmissionComp/AdmissionHeader";

const Admission = () => {
  // Get the current URL path
  const currentPathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/SALU-CMS-FYP/login");
    }
  }, [navigate]);

  return (
    <section className="admissionSection">
      <FormSideBar />
      <div className="admissionform">
        {/* Check if the current path includes "SALU-CMS-FYP/admissions/form" */}
        {currentPathname.includes("/admissions/form") ? (
          <></>
        ) : (
          <AdmissionHeader />
        )}
        <Outlet />
      </div>
    </section>
  );
};

export default Admission;
