import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  // Store actions
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

  // Document store actions and state
  const uploadedDocs = useDocumentStore((state) => state.uploadedDocs);
  const fetchUploadedDocuments = useDocumentStore(
    (state) => state.fetchUploadedDocuments
  );
  const { updateFormStatus } = useFormStatus();

  // ✅ Fetch documents once
  useEffect(() => {
    if (cnic) fetchUploadedDocuments(updateFormStatus);
  }, [cnic, fetchUploadedDocuments, updateFormStatus]);

  // ✅ Dynamically update document completion status
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
    const isLoggedIn = Cookies.get("LoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

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

        // Update form statuses based on data fetch results
        if (programSuccess) {
          updateFormStatus("programOfStudy", "Completed");
        }
        if (personalSuccess) {
          updateFormStatus("personalInformation", "Completed");
        }
        if (fatherGuardianSuccess) {
          updateFormStatus("fatherGuardianInformation", "Completed");
        }
        if (academicRecordSuccess) {
          updateFormStatus("academicRecord", "Completed");
        }

        // Document status is already handled in the separate useEffect above
      } catch (error) {
        console.error("Initialization error:", error);

        // Set all forms to pending if initialization fails
        const formSections = [
          "programOfStudy",
          "personalInformation",
          "fatherGuardianInformation",
          "academicRecord",
          "photographAndDocument",
        ];

        formSections.forEach((section) => {
          updateFormStatus(section, "Pending");
        });
      }
    };

    initializeAllData();
  }, [
    navigate,
    initializeProgramData,
    fetchPersonalInfo,
    fetchFatherGuardianInfo,
    initializeAcademicRecord,
    updateFormStatus,
  ]);

  // ✅ Toast notifications for form submissions
  useEffect(() => {
    // Check if we came from personal info submission
    if (location.state?.fromPersonalInfo) {
      updateFormStatus("personalInformation", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from documents submission
    if (location.state?.fromDocuments) {
      updateFormStatus("photographAndDocument", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from academic record submission
    if (location.state?.fromAcademicRecord) {
      updateFormStatus("academicRecord", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from program selection submission
    if (location.state?.fromProgramSelection) {
      updateFormStatus("programOfStudy", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from father/guardian info submission
    if (location.state?.fromFatherGuardian) {
      updateFormStatus("fatherGuardianInformation", "Completed");
      window.history.replaceState({}, document.title);
    }
  }, [location, updateFormStatus]);

  return (
    <section className="admissionSection">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <FormSideBar />
      <div className="admissionform">
        {!currentPathname.includes("/admissions/form") && <AdmissionHeader />}
        <Outlet />
      </div>
    </section>
  );
};

export default Admission;
