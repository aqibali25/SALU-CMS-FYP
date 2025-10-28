import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Admission.css";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import AdmissionHeader from "../../components/AdmissionComp/otherAdmissionComp/AdmissionHeader";
import useProgramSelectionStore from "../../store/programSelectionStore";
import usePersonalInfoStore from "../../store/personalInfoStore";
import { useFormStatus } from "../../contexts/AdmissionFormContext";
import useFatherGuardianStore from "../../store/fatherGuardianStore";

const Admission = () => {
  const currentPathname = useLocation().pathname;
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  const initializeProgramData = useProgramSelectionStore(
    (state) => state.initializeData
  );
  const fetchPersonalInfo = usePersonalInfoStore(
    (state) => state.fetchPersonalInfo
  );
  const fetchFatherGuardianInfo = useFatherGuardianStore(
    (state) => state.fetchFatherGuardianInfo
  );

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/SALU-CMS-FYP/login");
    } else {
      const initializeAllData = async () => {
        try {
          const [programSuccess, personalSuccess, fatherGuardianSuccess] =
            await Promise.all([
              initializeProgramData(),
              fetchPersonalInfo(),
              fetchFatherGuardianInfo(),
            ]);

          if (programSuccess) updateFormStatus("programOfStudy", "Completed");
          if (personalSuccess)
            updateFormStatus("personalInformation", "Completed");
          if (fatherGuardianSuccess)
            updateFormStatus("fatherGuardianInformation", "Completed");
        } catch (error) {
          console.error("Initialization error:", error);
        }
      };

      initializeAllData();
    }
  }, [
    navigate,
    initializeProgramData,
    fetchPersonalInfo,
    fetchFatherGuardianInfo,
    updateFormStatus,
  ]);

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
