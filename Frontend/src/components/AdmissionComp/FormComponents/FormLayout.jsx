import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import FormHeaderCard from "../FormHeaderCard";
import { Outlet } from "react-router-dom";
import useProgramSelectionStore from "../../../store/programSelectionStore";
import usePersonalInfoStore from "../../../store/personalInfoStore";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import useFatherGuardianStore from "../../../store/fatherGuardianStore";
import useAcademicRecordStore from "../../../store/useAcademicRecordStore.js";
import useDocumentStore from "../../../store/useDocumentStore";

const FormLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cnic = Cookies.get("cnic");

  // Refs to track initialization state
  const hasInitialized = useRef(false);
  const toastShown = useRef({
    programOfStudy: false,
    personalInformation: false,
    fatherGuardianInformation: false,
    academicRecord: false,
    photographAndDocument: false,
  });

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

  // Document store actions
  const uploadedDocs = useDocumentStore((state) => state.uploadedDocs);
  const fetchUploadedDocuments = useDocumentStore(
    (state) => state.fetchUploadedDocuments
  );
  const checkAllDocumentsUploaded = useDocumentStore(
    (state) => state.checkAllDocumentsUploaded
  );

  const { updateFormStatus } = useFormStatus();

  // ✅ Initialize all data and update form statuses - ONLY ONCE
  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Prevent multiple initializations
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeAllData = async () => {
      try {
        const [
          programResult,
          personalSuccess,
          fatherGuardianSuccess,
          academicRecordSuccess,
          documentsSuccess,
        ] = await Promise.allSettled([
          initializeProgramData(),
          fetchPersonalInfo(),
          fetchFatherGuardianInfo(),
          initializeAcademicRecord(),
          fetchUploadedDocuments(),
        ]);

        // ✅ Update program status only if actual data exists
        if (
          programResult.status === "fulfilled" &&
          programResult.value?.hasExistingData
        ) {
          updateFormStatus("programOfStudy", "Completed");
          if (!toastShown.current.programOfStudy) {
            toast.success("Program selection loaded successfully!");
            toastShown.current.programOfStudy = true;
          }
        } else {
          updateFormStatus("programOfStudy", "Pending");
        }

        // ✅ Update personal information status
        if (personalSuccess.status === "fulfilled" && personalSuccess.value) {
          updateFormStatus("personalInformation", "Completed");
          if (!toastShown.current.personalInformation) {
            toast.success("Personal information loaded successfully!");
            toastShown.current.personalInformation = true;
          }
        } else {
          updateFormStatus("personalInformation", "Pending");
        }

        // ✅ Update father/guardian information status
        if (
          fatherGuardianSuccess.status === "fulfilled" &&
          fatherGuardianSuccess.value
        ) {
          updateFormStatus("fatherGuardianInformation", "Completed");
          if (!toastShown.current.fatherGuardianInformation) {
            toast.success("Father & Guardian information loaded successfully!");
            toastShown.current.fatherGuardianInformation = true;
          }
        } else {
          updateFormStatus("fatherGuardianInformation", "Pending");
        }

        // ✅ Update academic record status
        if (
          academicRecordSuccess.status === "fulfilled" &&
          academicRecordSuccess.value
        ) {
          updateFormStatus("academicRecord", "Completed");
          if (!toastShown.current.academicRecord) {
            toast.success("Academic records loaded successfully!");
            toastShown.current.academicRecord = true;
          }
        } else {
          updateFormStatus("academicRecord", "Pending");
        }

        // ✅ Update photograph and document status
        if (documentsSuccess.status === "fulfilled" && documentsSuccess.value) {
          const allUploaded = checkAllDocumentsUploaded();
          updateFormStatus(
            "photographAndDocument",
            allUploaded ? "Completed" : "Pending"
          );
          // Document toast is handled in the store, but we track it here too
          if (!toastShown.current.photographAndDocument) {
            toastShown.current.photographAndDocument = true;
          }
        } else {
          updateFormStatus("photographAndDocument", "Pending");
        }
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
  }, []); // Empty dependency array - run only once on mount

  // ✅ Real-time document status updates when uploadedDocs changes (no fetching here)
  useEffect(() => {
    const allUploaded = checkAllDocumentsUploaded();
    updateFormStatus(
      "photographAndDocument",
      allUploaded ? "Completed" : "Pending"
    );
  }, [uploadedDocs, checkAllDocumentsUploaded, updateFormStatus]);

  // ✅ Toast notifications for form submissions
  useEffect(() => {
    // Check if we came from personal info submission
    if (location.state?.fromPersonalInfo) {
      toast.success("Personal information saved successfully!");
      updateFormStatus("personalInformation", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from documents submission
    if (location.state?.fromDocuments) {
      toast.success("All documents uploaded successfully!");
      updateFormStatus("photographAndDocument", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from academic record submission
    if (location.state?.fromAcademicRecord) {
      toast.success("Academic records saved successfully!");
      updateFormStatus("academicRecord", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from program selection submission
    if (location.state?.fromProgramSelection) {
      toast.success("Program selection saved successfully!");
      updateFormStatus("programOfStudy", "Completed");
      window.history.replaceState({}, document.title);
    }

    // Check if we came from father/guardian info submission
    if (location.state?.fromFatherGuardian) {
      toast.success("Father/Guardian information saved successfully!");
      updateFormStatus("fatherGuardianInformation", "Completed");
      window.history.replaceState({}, document.title);
    }
  }, [location, updateFormStatus]);

  return (
    <>
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
      <FormHeaderCard />
      <Outlet />
    </>
  );
};

export default FormLayout;
