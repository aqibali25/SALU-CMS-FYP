import React, { useState, useEffect } from "react";
import {
  FaCloudDownloadAlt,
  FaCloudUploadAlt,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import "../../../styles/FormSideBar.css";
import Cookies from "js-cookie";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Import your components
import FormPDFLayout from "./FormPDFLayout";
import ChallanLayout from "./ChallanLayout";
import TestSlipLayout from "./TestSlipLayout";
import useAllData from "../../../store/useAllData";

const CandidateStatus = () => {
  const [uploadedChallan, setUploadedChallan] = useState(null);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingForm, setIsGeneratingForm] = useState(false);
  const [isGeneratingChallan, setIsGeneratingChallan] = useState(false);
  const [isGeneratingSlip, setIsGeneratingSlip] = useState(false);
  const { formStatus } = useFormStatus();
  const cnic = Cookies.get("cnic");

  const {
    data: allData,
    loading: dataLoading,
    error: dataError,
    getAllData,
  } = useAllData();

  // ===========================================
  // 🔥 Fetch All Data on component mount - ONLY ONCE
  // ===========================================
  useEffect(() => {
    console.log("🚀 Component mounted, fetching data...");
    if (cnic && !dataLoading && !allData) {
      console.log("📡 Making API call...");
      getAllData(cnic);
    }
  }, [cnic]);

  // ===========================================
  // 🔥 Fetch Challan from DB on component load
  // ===========================================
  useEffect(() => {
    const fetchChallan = async () => {
      try {
        if (!cnic) {
          console.log("CNIC not found in cookies");
          return;
        }

        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3306/api/getUploadedDocuments/${cnic}`
        );

        console.log("Fetch challan response:", response.data);

        // Handle different response structures
        let documents = [];

        if (Array.isArray(response.data)) {
          documents = response.data;
        } else if (response.data && Array.isArray(response.data.documents)) {
          documents = response.data.documents;
        } else if (response.data && Array.isArray(response.data.data)) {
          documents = response.data.data;
        }

        // Find the fee challan document
        const challanDoc = documents.find(
          (doc) =>
            doc.docType === "feeChallan" ||
            doc.docType === "challan" ||
            doc.docName?.toLowerCase().includes("challan") ||
            doc.docName?.toLowerCase().includes("fee") ||
            doc.fileName?.toLowerCase().includes("challan")
        );

        if (challanDoc) {
          setUploadedChallan(challanDoc);
          setAlreadyUploaded(true);
        }
      } catch (error) {
        console.log("Error fetching challan", error);
        if (error.response?.status !== 404) {
          toast.error("Error loading challan data!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (cnic) {
      fetchChallan();
    }
  }, [cnic]);

  // ==================================================
  // 🔥 Upload Challan (Select File)
  // ==================================================
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (alreadyUploaded) {
      toast.info("🟡 Challan is already uploaded!");
      return;
    }

    // File validation
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPEG, PNG, or PDF files.");
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      toast.error(
        "File size too large. Please upload files smaller than 10MB."
      );
      e.target.value = "";
      return;
    }

    setUploadedChallan(file);
    toast.info("📁 File selected. Click 'Upload Challan' to submit.");
  };

  // ==================================================
  // 🔥 FINAL Upload to Database (Button Click)
  // ==================================================
  const handleFinalUpload = async () => {
    if (!uploadedChallan) {
      toast.error("Please select a file first!");
      return;
    }

    if (!cnic) {
      toast.error("User authentication failed. Please login again.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("document", uploadedChallan);
      formData.append("cnic", cnic);
      formData.append("docType", "feeChallan");
      formData.append("docName", "Paid Fee Challan");

      const response = await axios.post(
        `http://localhost:3306/api/uploadDocument`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        }
      );

      if (
        response.data.message &&
        response.data.message.includes("successfully")
      ) {
        setAlreadyUploaded(true);
        const uploadedData = {
          ...response.data.document,
          documentId: response.data.documentId || response.data.document?.id,
        };
        setUploadedChallan(uploadedData);
        toast.success("Challan uploaded to database successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errorMessage = response.data.message || "Unknown error occurred";
        toast.error(`Failed to upload challan: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading challan! Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ===========================================
  // 🔥 Delete Uploaded Challan with Confirmation
  // ===========================================
  const handleDeleteChallan = async () => {
    if (!uploadedChallan?.documentId && !uploadedChallan?.id) {
      toast.error("No challan to delete!");
      return;
    }

    toast.info(
      <div>
        <p>Are you sure you want to delete this challan?</p>
        <div className="d-flex gap-2 justify-content-center mt-2">
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              toast.dismiss();
              await performDelete();
            }}
          >
            Yes, Delete
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const performDelete = async () => {
    try {
      const documentId = uploadedChallan.documentId || uploadedChallan.id;
      const response = await axios.delete(
        `http://localhost:3306/api/deleteDocument/${documentId}`
      );

      if (
        response.data.message &&
        response.data.message.includes("successfully")
      ) {
        setUploadedChallan(null);
        setAlreadyUploaded(false);
        toast.success("Challan deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errorMessage = response.data.message || "Unknown error";
        toast.error(`Failed to delete challan: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting challan!");
    }
  };

  // ===========================================
  // 🔥 Preview Uploaded Challan
  // ===========================================
  const previewFile = async () => {
    if (!uploadedChallan) return;

    try {
      if (uploadedChallan instanceof File) {
        const fileURL = URL.createObjectURL(uploadedChallan);
        window.open(fileURL, "_blank");
        return;
      }

      if (uploadedChallan.documentId || uploadedChallan.id) {
        const documentId = uploadedChallan.documentId || uploadedChallan.id;
        const response = await axios.get(
          `http://localhost:3306/api/viewDocument/${documentId}`,
          { responseType: "blob" }
        );
        const blobUrl = URL.createObjectURL(response.data);
        window.open(blobUrl, "_blank");
      }
    } catch (error) {
      console.error("Error previewing challan:", error);
      toast.error("Error previewing challan!");
    }
  };

  // ===========================================
  // 🔥 Download Uploaded Challan File
  // ===========================================
  const downloadFile = async () => {
    if (!uploadedChallan) return;

    try {
      if (uploadedChallan instanceof File) {
        const fileURL = URL.createObjectURL(uploadedChallan);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = uploadedChallan.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      if (uploadedChallan.documentId || uploadedChallan.id) {
        const documentId = uploadedChallan.documentId || uploadedChallan.id;
        const response = await axios.get(
          `http://localhost:3306/api/downloadDocument/${documentId}`,
          { responseType: "blob" }
        );
        const blobUrl = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download =
          uploadedChallan.fileName || uploadedChallan.docName || "challan.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading challan:", error);
      toast.error("Error downloading challan!");
    }
  };

  // ===========================================
  // 🔥 Download Form as PDF
  // ===========================================
  const handleDownloadForm = async () => {
    if (formStatus.percentage !== 100) {
      toast.error("Please complete the form first");
      return;
    }
    if (!allData) {
      toast.error("Please wait for data to load");
      return;
    }

    try {
      setIsGeneratingForm(true);
      toast.info("Generating PDF form...");

      // Create a temporary container for the form
      const formContainer = document.createElement("div");
      formContainer.style.position = "absolute";
      formContainer.style.left = "-9999px";
      formContainer.style.top = "0";
      formContainer.style.width = "210mm";
      formContainer.style.padding = "20px";
      formContainer.style.background = "white";
      document.body.appendChild(formContainer);

      // Render the FormPDFLayout component with data into the container
      const { createRoot } = await import("react-dom/client");
      const root = createRoot(formContainer);
      root.render(<FormPDFLayout data={allData} />);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const canvas = await html2canvas(formContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: formContainer.scrollWidth,
        height: formContainer.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Admission-Form-${cnic || "unknown"}.pdf`);

      document.body.removeChild(formContainer);
      toast.success("Form downloaded successfully!");
    } catch (error) {
      console.error("Error generating form PDF:", error);
      toast.error("Error generating form PDF!");
    } finally {
      setIsGeneratingForm(false);
    }
  };

  // ===========================================
  // 🔥 Download Challan as PDF
  // ===========================================
  const handleDownloadChallan = async () => {
    if (formStatus.percentage !== 100) {
      toast.error("Please complete the form first");
      return;
    }
    if (!allData) {
      toast.error("Please wait for data to load");
      return;
    }

    try {
      setIsGeneratingChallan(true);
      toast.info("Generating challan PDF...");

      const challanContainer = document.createElement("div");
      challanContainer.style.position = "absolute";
      challanContainer.style.left = "-9999px";
      challanContainer.style.top = "0";
      challanContainer.style.width = "170mm";
      challanContainer.style.padding = "10px";
      challanContainer.style.background = "white";
      document.body.appendChild(challanContainer);

      const { createRoot } = await import("react-dom/client");
      const root = createRoot(challanContainer);
      root.render(<ChallanLayout data={allData} />);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const canvas = await html2canvas(challanContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: challanContainer.scrollWidth,
        height: challanContainer.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Fee-Challan-${cnic || "unknown"}.pdf`);

      document.body.removeChild(challanContainer);
      toast.success("Challan downloaded successfully!");
    } catch (error) {
      console.error("Error generating challan PDF:", error);
      toast.error("Error generating challan PDF!");
    } finally {
      setIsGeneratingChallan(false);
    }
  };

  // ===========================================
  // 🔥 Download Test Slip as PDF
  // ===========================================
  const handleDownloadSlip = async () => {
    if (!allData) {
      toast.error("Please wait for data to load");
      return;
    }

    try {
      setIsGeneratingSlip(true);
      toast.info("Generating test slip PDF...");

      const slipContainer = document.createElement("div");
      slipContainer.style.position = "absolute";
      slipContainer.style.left = "-9999px";
      slipContainer.style.top = "0";
      slipContainer.style.width = "210mm";
      slipContainer.style.padding = "20px";
      slipContainer.style.background = "white";
      document.body.appendChild(slipContainer);

      const { createRoot } = await import("react-dom/client");
      const root = createRoot(slipContainer);
      root.render(<TestSlipLayout data={allData} />);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const canvas = await html2canvas(slipContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: slipContainer.scrollWidth,
        height: slipContainer.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Test-Slip-${cnic || "unknown"}.pdf`);

      document.body.removeChild(slipContainer);
      toast.success("Test slip downloaded successfully!");
    } catch (error) {
      console.error("Error generating test slip PDF:", error);
      toast.error("Error generating test slip PDF!");
    } finally {
      setIsGeneratingSlip(false);
    }
  };

  // ===========================================
  // 🔥 Helper function to check if entry test roll number exists and is not null
  // ===========================================
  const hasEntryTestRollNumber = () => {
    if (!allData?.data?.personal_info) {
      return false;
    }

    // Handle both array and object formats
    const personalInfo = Array.isArray(allData.data.personal_info)
      ? allData.data.personal_info[0]
      : allData.data.personal_info;

    return (
      personalInfo &&
      personalInfo.entry_test_roll_no !== null &&
      personalInfo.entry_test_roll_no !== undefined &&
      personalInfo.entry_test_roll_no !== ""
    );
  };

  // Helper functions for file display
  const getFileName = () => {
    if (!uploadedChallan) return "";
    if (uploadedChallan instanceof File) return uploadedChallan.name;
    return uploadedChallan.fileName || uploadedChallan.docName || "challan.pdf";
  };

  const getFileSize = () => {
    if (!uploadedChallan) return "0 KB";
    if (uploadedChallan instanceof File)
      return `${(uploadedChallan.size / 1024).toFixed(1)} KB`;
    return uploadedChallan.fileSize || "N/A";
  };

  const getUploadDate = () => {
    if (!uploadedChallan || uploadedChallan instanceof File) return "";
    return uploadedChallan.uploadDate || uploadedChallan.createdAt || "";
  };

  // Show loading state while data is being fetched
  if (dataLoading) {
    return (
      <div className="formConitainer d-flex justify-content-center align-items-center h-75 col-md-12 p-4">
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading candidate data...</p>
        </div>
      </div>
    );
  }

  // Show error state if data fetching fails
  if (dataError) {
    return (
      <div className="formConitainer col-md-12 p-4">
        <ToastContainer />
        <div className="alert alert-danger" role="alert">
          Error loading candidate data: {dataError}
        </div>
      </div>
    );
  }

  return (
    <div className="formConitainer col-md-12 p-4">
      <ToastContainer />
      <h2 className="mb-1" style={{ color: "#e9c545" }}>
        Candidate Status
      </h2>

      <hr />

      <form className="formContainer position-relative">
        {/* Download Challan Card */}
        <div
          className="downloadBox d-flex align-items-center justify-content-between p-3 flex-wrap"
          style={{
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #eee",
            gap: "10px",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="me-3 d-flex justify-content-center align-items-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#e9ecef",
              }}
            >
              <FaCloudDownloadAlt size={20} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Download Challan</h6>
              <small>Download fee challan for admission form payment.</small>
            </div>
          </div>
          <div className="buttonContainer">
            <button
              className="button buttonFilled btn-sm"
              onClick={handleDownloadChallan}
              type="button"
              disabled={isGeneratingChallan || !allData}
            >
              {isGeneratingChallan ? "Generating..." : "Download"}
            </button>
          </div>
        </div>

        {/* Download Form Card */}
        <div
          className="downloadBox d-flex align-items-center justify-content-between p-3 flex-wrap"
          style={{
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #eee",
            gap: "10px",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="me-3 d-flex justify-content-center align-items-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#e9ecef",
              }}
            >
              <FaCloudDownloadAlt size={20} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Download Form</h6>
              <small>Download your complete Admission Form.</small>
            </div>
          </div>
          <div className="buttonContainer">
            <button
              className="button buttonFilled btn-sm"
              onClick={handleDownloadForm}
              type="button"
              disabled={isGeneratingForm || !allData}
            >
              {isGeneratingForm ? "Generating..." : "Download"}
            </button>
          </div>
        </div>

        {/* Download Slip Card - ONLY SHOW IF ROLL NUMBER EXISTS AND IS NOT NULL */}
        {hasEntryTestRollNumber() && (
          <div
            className="downloadBox d-flex align-items-center justify-content-between p-3 mb-4 flex-wrap"
            style={{
              background: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #eee",
              gap: "10px",
            }}
          >
            <div className="d-flex align-items-center">
              <div
                className="me-3 d-flex justify-content-center align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#e9ecef",
                }}
              >
                <FaCloudDownloadAlt size={20} />
              </div>
              <div>
                <h6 className="mb-0 fw-bold">Download Test Slip</h6>
                <small>Download your Entry Test Slip.</small>
              </div>
            </div>
            <div className="buttonContainer">
              <button
                className="button buttonFilled btn-sm"
                onClick={handleDownloadSlip}
                type="button"
                disabled={isGeneratingSlip || !allData}
              >
                {isGeneratingSlip ? "Generating..." : "Download"}
              </button>
            </div>
          </div>
        )}

        {/* Uploaded Challan Card */}
        {uploadedChallan && (
          <div
            className="mx-auto mb-4"
            style={{
              width: "100%",
              maxWidth: "fit-content",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div className="d-flex align-items-center flex-column justify-content-between flex-wrap">
              <div className="d-flex align-items-center mb-2 flex-grow-1">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#000",
                    color: "#fff",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  PDF
                </div>
                <div className="ms-3 flex-grow-1">
                  <p className="mb-0 fw-bold">{getFileName()}</p>
                  <small>
                    {getFileSize()} • {getUploadDate()}
                  </small>
                  <br />
                  <small
                    className={
                      alreadyUploaded ? "text-success" : "text-warning"
                    }
                  >
                    {alreadyUploaded ? "" : "Ready to Upload"}
                  </small>
                </div>
              </div>
              <div className="d-flex gap-2 ms-3">
                <FaEye
                  size={22}
                  onClick={previewFile}
                  style={{ cursor: "pointer", color: "#007bff" }}
                  title="Preview Challan"
                />
                {alreadyUploaded && (
                  <>
                    <FaCloudDownloadAlt
                      size={22}
                      onClick={downloadFile}
                      style={{ cursor: "pointer", color: "#28a745" }}
                      title="Download Challan"
                    />
                    <FaTrash
                      size={20}
                      onClick={handleDeleteChallan}
                      style={{ cursor: "pointer", color: "#dc3545" }}
                      title="Delete Challan"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <h5 className="text-center mb-3 fw-bold">Upload Your Paid Challan</h5>
        <div
          className="mx-auto text-center p-4"
          style={{
            width: "100%",
            maxWidth: "400px",
            border: "2px dashed #d0d0d0",
            borderRadius: "12px",
            background: "#fdfdfd",
          }}
        >
          <FaCloudUploadAlt size={35} className="mb-2" />
          <p className="mb-1 fw-semibold">
            Choose a file or drag & drop it here.
          </p>
          <small className="text-muted">
            JPEG, PNG, and PDF formats (Max 10MB).
          </small>
          <div className="mt-3">
            <label
              className={`btn ${
                alreadyUploaded ? "btn-secondary" : "btn-light border"
              } px-4`}
            >
              {isLoading ? "Loading..." : "Browse File"}
              <input
                type="file"
                hidden
                accept="application/pdf,image/png,image/jpeg"
                disabled={alreadyUploaded || isLoading}
                onChange={handleFileUpload}
              />
            </label>
          </div>
          {alreadyUploaded && (
            <div className="mt-2">
              <small className="text-success">
                Challan already uploaded. You can delete and re-upload if
                needed.
              </small>
            </div>
          )}
        </div>

        {/* Final Upload Button */}
        {uploadedChallan && !alreadyUploaded && (
          <div className="buttonContainer w-100 d-flex justify-content-end mt-3">
            <button
              type="button"
              className="button buttonFilled"
              onClick={handleFinalUpload}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Challan"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CandidateStatus;
