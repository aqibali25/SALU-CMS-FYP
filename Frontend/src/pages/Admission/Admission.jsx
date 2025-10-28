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
import useAcademicRecordStore from "../../store/useAcademicRecordStore.js";
import useDocumentStore from "../../store/useDocumentStore";

const Admission = () => {
  const currentPathname = useLocation().pathname;
  const navigate = useNavigate();
  const cnic = Cookies.get("cnic");

  const initializeProgramData = useProgramSelectionStore(
    (state) => state.initializeData
  );
  const fetchPersonalInfo = usePersonalInfoStore(
    (state) => state.fetchPersonalInfo
  );
  const fetchFatherGuardianInfo = useFatherGuardianStore(
    (state) => state.fetchFatherGuardianInfo
  );
  const initializeAcademicRecord = useAcademicRecordStore(
    (state) => state.fetchAcademicRecord
  );

  // ✅ Access uploaded documents from store
  const uploadedDocs = useDocumentStore((state) => state.uploadedDocs);
  const fetchUploadedDocuments = useDocumentStore(
    (state) => state.fetchUploadedDocuments
  );
  const { updateFormStatus } = useFormStatus();

  // ✅ Fetch documents once
  useEffect(() => {
    if (cnic) fetchUploadedDocuments(updateFormStatus);
  }, [cnic, fetchUploadedDocuments, updateFormStatus]);

  // ✅ Dynamically update completion status
  useEffect(() => {
    const totalRequired = 6; // you can also derive this from availableDocs + uploadedDocs if needed
    const completed = uploadedDocs.length;
    const allUploaded = completed >= totalRequired;

    updateFormStatus(
      "photographAndDocument",
      allUploaded ? "Completed" : "Pending"
    );
  }, [uploadedDocs, updateFormStatus]);
  useEffect(() => {
    document.title = "Admission | SALU Ghotki";
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/SALU-CMS-FYP/login");
    } else {
      const initializeAllData = async () => {
        try {
          const [
            programSuccess,
            personalSuccess,
            fatherGuardianSuccess,
            academicRecordSuccess,
          ] = await Promise.all([
            initializeProgramData(),
            fetchPersonalInfo(),
            fetchFatherGuardianInfo(),
            initializeAcademicRecord(),
          ]);

          if (programSuccess) updateFormStatus("programOfStudy", "Completed");
          if (personalSuccess)
            updateFormStatus("personalInformation", "Completed");
          if (fatherGuardianSuccess)
            updateFormStatus("fatherGuardianInformation", "Completed");
          if (academicRecordSuccess)
            updateFormStatus("academicRecord", "Completed");

          // ✅ Fetch uploaded docs and update photograph/document form status
          await fetchUploadedDocuments();
          const totalRequired = 6; // you can dynamically set this based on backend
          const completed = uploadedDocs.length;
          const allUploaded = completed >= totalRequired;

          updateFormStatus(
            "photographAndDocument",
            allUploaded ? "Completed" : "Pending"
          );
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
    initializeAcademicRecord,
    updateFormStatus,
    fetchUploadedDocuments,
    uploadedDocs,
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
