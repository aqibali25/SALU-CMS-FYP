import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormHeaderCard from "../FormHeaderCard";
import { Outlet } from "react-router-dom";

const FormLayout = () => {
  const location = useLocation();

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
