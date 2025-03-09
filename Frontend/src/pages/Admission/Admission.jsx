import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Admission.css";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import AdmissionHeader from "../../components/AdmissionComp/otherAdmissionComp/AdmissionHeader";

const Admission = () => {
  // Get the current URL path
  const currentPathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";
    const isLoggedIn = Cookies.get("isLoggedIn"); // Get authentication status from cookies
    if (!isLoggedIn) {
      navigate("/SALU-CMS-FYP/login");
    }
  }, [navigate]);

  return (
    <section className="admissionSection">
      <FormSideBar />
      <div className="admissionform">
        {/* Hide AdmissionHeader if current path includes "SALU-CMS-FYP/admissions/form" */}
        {!currentPathname.includes("/admissions/form") && <AdmissionHeader />}
        <Outlet />
      </div>
    </section>
  );
};

export default Admission;
