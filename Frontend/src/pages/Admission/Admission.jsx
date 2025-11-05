import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./Admission.css";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import AdmissionHeader from "../../components/AdmissionComp/otherAdmissionComp/AdmissionHeader";

const Admission = () => {
  const currentPathname = useLocation().pathname;

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";
  }, []);

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
