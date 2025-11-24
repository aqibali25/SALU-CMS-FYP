import React, { useState, useEffect } from "react";
import { FaCloudDownloadAlt, FaCloudUploadAlt, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/FormSideBar.css";

const CandidateStatus = () => {
  const [uploadedChallan, setUploadedChallan] = useState(null);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const downloadFile = (fileName) => {
    const link = document.createElement("a");
    link.href = "/sample/" + fileName;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="formConitainer col-md-12 p-4">
      <ToastContainer />
      <h2 className="mb-1" style={{ color: "#e9c545" }}>
        Candidate Status
      </h2>
      <hr />

      <form className="formContainer position-relative">
        {/* ---------------------- DOWNLOAD CHALLAN ---------------------- */}
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
              <small>Download and upload the Challan After Pay.</small>
            </div>
          </div>

          {/* Buttons */}
          <div className="buttonContainer d-flex gap-2">
            <button
              className="button buttonFilled btn-sm"
              onClick={() => downloadFile("challan.pdf")}
              type="button"
            >
              Download
            </button>

            <button
              className="button buttonNotFilled btn-sm"
              onClick={() => window.open("/sample/challan.pdf")}
              type="button"
            >
              Preview
            </button>
          </div>
        </div>

        {/* ---------------------- DOWNLOAD FORM ---------------------- */}
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
              <h6 className="mb-0 fw-bold">Download Form</h6>
              <small>Download your Admission Form.</small>
            </div>
          </div>

          {/* Buttons */}
          <div className="buttonContainer d-flex gap-2">
            <button
              className="button buttonFilled btn-sm"
              onClick={() => downloadFile("admission-form.pdf")}
              type="button"
            >
              Download
            </button>

            <button
              className="button buttonNotFilled btn-sm"
              onClick={() => window.open("/sample/admission-form.pdf")}
              type="button"
            >
              Preview
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
