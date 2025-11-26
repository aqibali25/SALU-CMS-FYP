import React, { useState, useEffect } from "react";
import { FaCloudDownloadAlt, FaCloudUploadAlt, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import FormPDFLayout from "./FormPDFLayout";
import { generatePDF } from "../../../utils/pdfGenerator";
import "../../../styles/FormSideBar.css";

const CandidateStatus = () => {
  const [uploadedChallan, setUploadedChallan] = useState(null);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { formStatus } = useFormStatus();

  // ===========================================
  // 🔥 Fetch Challan from DB on component load
  // ===========================================
  useEffect(() => {
    const fetchChallan = async () => {
      try {
        // const res = await fetch("/api/get-challan");
        // const data = await res.json();

        const data = {
          challan: null, // change to file name string to simulate DB
        };

        if (data.challan) {
          setUploadedChallan(data.challan);
          setAlreadyUploaded(true);
        }
      } catch (error) {
        console.log("Error fetching challan", error);
      }
    };

    fetchChallan();
  }, []);

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

    setUploadedChallan(file);
  };

  // ==================================================
  // 🔥 FINAL Upload to Database (Button Click)
  // ==================================================
  const handleFinalUpload = async () => {
    if (!uploadedChallan) {
      toast.error("Please select a file first!");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("challan", uploadedChallan);

      // REAL API CALL
      // const res = await fetch("/api/upload-challan", {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await res.json();

      // if (!data.success) {
      //   toast.error("Failed to upload!");
      //   return;
      // }

      setAlreadyUploaded(true);
      toast.success("✅ Challan uploaded to database!");
    } catch (error) {
      toast.error("Error uploading challan!");
    } finally {
      setIsUploading(false);
    }
  };

  // ===========================================
  // 🔥 Preview PDF
  // ===========================================
  const previewFile = () => {
    if (!uploadedChallan) return;

    const fileURL = URL.createObjectURL(uploadedChallan);
    window.open(fileURL, "_blank");
  };

  // ===========================================
  // 🔥 Check if form is complete
  // ===========================================
  const isFormComplete = () => {
    return formStatus.percentage === 100;
  };

  // ===========================================
  // 🔥 Handle Download/Preview with Form Check
  // ===========================================
  const handleDownloadOrPreview = (action, type) => {
    if (!isFormComplete()) {
      toast.error(
        `❌ Please complete your admission form (100%) to ${action} the ${type}!`
      );
      return false;
    }
    return true;
  };

  // ===========================================
  // 🔥 Generate Form PDF
  // ===========================================
  const generateFormPDF = async () => {
    if (!handleDownloadOrPreview("download", "form")) return;

    try {
      setIsGenerating(true);
      toast.info("🔄 Generating Admission Form...");

      // Wait a moment for the toast to show
      await new Promise((resolve) => setTimeout(resolve, 500));

      await generatePDF("admission-form-layout", "admission-form.pdf");
      toast.success("✅ Admission Form downloaded successfully!");
    } catch (error) {
      console.error("Error generating form PDF:", error);
      toast.error("❌ Error generating admission form!");
    } finally {
      setIsGenerating(false);
    }
  };

  // ===========================================
  // 🔥 Generate Challan PDF
  // ===========================================
  const generateChallanPDF = async () => {
    if (!handleDownloadOrPreview("download", "challan")) return;

    try {
      setIsGenerating(true);
      toast.info("🔄 Generating Fee Challan...");

      // Wait a moment for the toast to show
      await new Promise((resolve) => setTimeout(resolve, 500));

      await generatePDF("challan-layout", "fee-challan.pdf");
      toast.success("✅ Challan downloaded successfully!");
    } catch (error) {
      console.error("Error generating challan PDF:", error);
      toast.error("❌ Error generating challan!");
    } finally {
      setIsGenerating(false);
    }
  };

  // ===========================================
  // 🔥 Preview Generated Form
  // ===========================================
  const previewGeneratedForm = async () => {
    if (!handleDownloadOrPreview("preview", "form")) return;

    try {
      setIsGenerating(true);
      toast.info("🔄 Loading Admission Form Preview...");

      await generateFormPreview();
    } catch (error) {
      console.error("Error previewing form:", error);
      toast.error("❌ Error loading form preview!");
    } finally {
      setIsGenerating(false);
    }
  };

  // ===========================================
  // 🔥 Preview Generated Challan
  // ===========================================
  const previewGeneratedChallan = async () => {
    if (!handleDownloadOrPreview("preview", "challan")) return;

    try {
      setIsGenerating(true);
      toast.info("🔄 Loading Challan Preview...");

      await generateChallanPreview();
    } catch (error) {
      console.error("Error previewing challan:", error);
      toast.error("❌ Error loading challan preview!");
    } finally {
      setIsGenerating(false);
    }
  };

  // ===========================================
  // 🔥 Generate Form Preview (opens in new tab)
  // ===========================================
  const generateFormPreview = async () => {
    const element = document.getElementById("admission-form-layout");
    if (!element) return;

    try {
      const { generatePDFPreview } = await import(
        "../../../utils/pdfGenerator"
      );
      await generatePDFPreview("admission-form-layout");
    } catch (error) {
      console.error("Error generating preview:", error);
      // Fallback: Show the form in a modal or new window
      window.open("#form-preview", "_blank");
    }
  };

  // ===========================================
  // 🔥 Generate Challan Preview (opens in new tab)
  // ===========================================
  const generateChallanPreview = async () => {
    const element = document.getElementById("challan-layout");
    if (!element) return;

    try {
      const { generatePDFPreview } = await import(
        "../../../utils/pdfGenerator"
      );
      await generatePDFPreview("challan-layout");
    } catch (error) {
      console.error("Error generating preview:", error);
      // Fallback: Show the challan in a modal or new window
      window.open("#challan-preview", "_blank");
    }
  };

  return (
    <div className="formConitainer col-md-12 p-4">
      <ToastContainer />
      <h2 className="mb-1" style={{ color: "#e9c545" }}>
        Candidate Status
      </h2>

      <hr />

      {/* Hidden Form Layout for PDF Generation */}
      <div style={{ display: "none" }}>
        <div id="admission-form-layout">
          <FormPDFLayout />
        </div>

        {/* Challan Layout - You'll need to create this similar to FormPDFLayout */}
        <div id="challan-layout">
          {/* Add your challan layout component here */}
          <div className="challan-container border border-dark mx-auto mt-4 p-4">
            <div className="text-center">
              <h4>SHAH ABDUL LATIF UNIVERSITY, KHAIRPUR</h4>
              <h5>FEE CHALLAN</h5>
            </div>
            <div className="row">
              <div className="col-6">
                <p>
                  <strong>Challan No:</strong> CH{Date.now()}
                </p>
                <p>
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="col-6 text-end">
                <p>
                  <strong>Student Name:</strong> Muhammad Sheeraz
                </p>
                <p>
                  <strong>Father's Name:</strong> Sardar Ali
                </p>
              </div>
            </div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Fee Type</strong>
                  </td>
                  <td>
                    <strong>Amount</strong>
                  </td>
                </tr>
                <tr>
                  <td>Admission Form Fee</td>
                  <td>Rs. 2,500</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>Rs. 2,500</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <p>
                <strong>Amount in Words:</strong> Two Thousand Five Hundred
                Rupees Only
              </p>
            </div>
            <div className="row mt-5">
              <div className="col-4 text-center">
                <p>________________</p>
                <p>Student Signature</p>
              </div>
              <div className="col-4 text-center">
                <p>________________</p>
                <p>Bank Officer</p>
              </div>
              <div className="col-4 text-center">
                <p>________________</p>
                <p>University Stamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="formContainer position-relative">
        {/* ---------------------- GENERATE & DOWNLOAD CHALLAN ---------------------- */}
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
              <h6 className="mb-0 fw-bold">Generate & Download Challan</h6>
              <small>Generate fee challan for admission form payment.</small>
            </div>
          </div>

          {/* Buttons */}
          <div className="buttonContainer d-flex gap-2">
            <button
              className="button buttonFilled btn-sm"
              onClick={generateChallanPDF}
              type="button"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Download"}
            </button>

            <button
              className="button buttonNotFilled btn-sm"
              onClick={previewGeneratedChallan}
              type="button"
              disabled={isGenerating}
            >
              {isGenerating ? "Loading..." : "Preview"}
            </button>
          </div>
        </div>

        {/* ---------------------- GENERATE & DOWNLOAD FORM ---------------------- */}
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
              <h6 className="mb-0 fw-bold">Generate & Download Form</h6>
              <small>Generate your complete Admission Form.</small>
            </div>
          </div>

          {/* Buttons */}
          <div className="buttonContainer d-flex gap-2">
            <button
              className="button buttonFilled btn-sm"
              onClick={generateFormPDF}
              type="button"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Download"}
            </button>

            <button
              className="button buttonNotFilled btn-sm"
              onClick={previewGeneratedForm}
              type="button"
              disabled={isGenerating}
            >
              {isGenerating ? "Loading..." : "Preview"}
            </button>
          </div>
        </div>

        {/* ---------------------- FILE PREVIEW CARD ---------------------- */}
        {uploadedChallan && (
          <div
            className="mx-auto mb-4"
            style={{
              width: "100%",
              maxWidth: "380px",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center mb-2">
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
                  }}
                >
                  PDF
                </div>

                <div className="ms-3">
                  <p className="mb-0 fw-bold">{uploadedChallan.name}</p>
                  <small>
                    {(uploadedChallan.size / 1024).toFixed(1)} KB — Ready to
                    Upload
                  </small>
                </div>
              </div>

              <FaEye
                size={20}
                onClick={previewFile}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}

        {/* ---------------------- UPLOAD SECTION ---------------------- */}
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
          <small className="text-muted">JPEG, PNG, and PDF formats.</small>

          <div className="mt-3">
            <label className="btn btn-light border px-4">
              Browse File
              <input
                type="file"
                hidden
                accept="application/pdf,image/png,image/jpeg"
                disabled={alreadyUploaded}
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* 🔥 FINAL UPLOAD BUTTON */}
        {uploadedChallan && !alreadyUploaded && (
          <div className="buttonContainer w-100 d-flex justify-content-end mt-3">
            <button
              type="submit"
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
