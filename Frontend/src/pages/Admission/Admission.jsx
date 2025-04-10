import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Admission.css";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import AdmissionHeader from "../../components/AdmissionComp/otherAdmissionComp/AdmissionHeader";
import useProgramSelectionStore from "../../store/programSelectionStore";
import { useFormStatus } from "../../contexts/AdmissionFormContext";

const Admission = () => {
  const currentPathname = useLocation().pathname;
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();
  const initializeData = useProgramSelectionStore(
    (state) => state.initializeData
  );

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/SALU-CMS-FYP/login");
    } else {
      const checkData = async () => {
        const dataFetched = await initializeData();
        if (dataFetched) {
          updateFormStatus("programOfStudy", "Completed");
        }
      };
      checkData();
    }
  }, [navigate, initializeData, updateFormStatus]);

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
