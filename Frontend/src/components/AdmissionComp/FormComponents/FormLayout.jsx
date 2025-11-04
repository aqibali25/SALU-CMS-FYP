import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormHeaderCard from "../FormHeaderCard"; // Adjust import path as needed
import { Outlet } from "react-router-dom";

const FormLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we came from personal info submission
    if (location.state?.fromPersonalInfo) {
      toast.success("Personal information saved successfully!");

      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }

    // Check if we came from documents submission
    if (location.state?.fromDocuments) {
      toast.success("All documents uploaded successfully!");

      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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
