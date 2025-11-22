import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Admission.css";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import AdmissionHeader from "../../components/AdmissionComp/otherAdmissionComp/AdmissionHeader";
import Cookies from "js-cookie";

const Admission = () => {
  const currentPathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";
    const isLoggedIn = Cookies.get("LoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <section className="admissionSection">
      <FormSideBar />
      <div className="admissionform">
        {!currentPathname.includes("/admissions/form") && <AdmissionHeader />}
        <Outlet />
      </div>
    </section>
  );
};

export default Admission;
