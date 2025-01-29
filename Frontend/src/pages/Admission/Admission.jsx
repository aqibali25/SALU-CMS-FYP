import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Admission.css";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";

const Admission = () => {
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
        <Outlet></Outlet>
      </div>
    </section>
  );
};

export default Admission;
