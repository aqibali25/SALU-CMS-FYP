import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputContainer from "../InputContainer";
import UploadedDoc from "../UploadedDoc";
import SkeletonLoader from "../SkeletonLoader.jsx";
import useDocumentStore from "../../../store/useDocumentStore";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import Cookies from "js-cookie";

const PhotographAndDocument = () => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const cnic = Cookies.get("cnic");
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  const {
    availableDocs,
    selectedDoc,
    file,
    uploadedDocs,
    loading,
    error,
    fetchUploadedDocuments,
    setSelectedDoc,
    setFile,
    uploadDocument,
    removeUploadedDoc,
    checkAllDocumentsUploaded,
    fetchAttempts,
    maxFetchAttempts,
    resetFetchState, // Add this if you need manual retry
  } = useDocumentStore();

  // ✅ Enhanced fetch with retry logic
  useEffect(() => {
    const fetchData = async () => {
      if (cnic) {
        await fetchUploadedDocuments();
      }
    };

    fetchData();
  }, [cnic, fetchUploadedDocuments]);

  // ✅ Show retry message if max attempts reached and still loading
  useEffect(() => {
    if (fetchAttempts >= maxFetchAttempts && loading) {
      set({ loading: false });
      toast.error(
        "Failed to load documents after multiple attempts. Please refresh the page."
      );
    }
  }, [fetchAttempts, maxFetchAttempts, loading]);

  // ✅ Dynamically update completion status
  useEffect(() => {
    const allUploaded = checkAllDocumentsUploaded();
    updateFormStatus(
      "photographAndDocument",
      allUploaded ? "Completed" : "Pending"
    );
  }, [
    uploadedDocs,
    availableDocs,
    updateFormStatus,
    checkAllDocumentsUploaded,
  ]);

  // ✅ File validation
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      // File size validation (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes

      if (!allowedTypes.includes(uploadedFile.type)) {
        toast.error(
          "Invalid file type. Please upload JPEG, PNG, PDF, or DOC files."
        );
        fileInputRef.current.value = "";
        return;
      }

      if (uploadedFile.size > maxSize) {
        toast.error(
          "File size too large. Please upload files smaller than 10MB."
        );
        fileInputRef.current.value = "";
        return;
      }

      setFile(uploadedFile);
    }
  };

  // ✅ Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const success = await uploadDocument();
    if (success) {
      fileInputRef.current.value = "";

      // Check if all documents are uploaded after successful upload
      const allUploaded = checkAllDocumentsUploaded();
      if (allUploaded) {
        updateFormStatus("photographAndDocument", "Completed");
        // Navigate with state to show success toast on next page
        navigate("/admissions/form", {
          state: { fromDocuments: true },
        });
      }
    }
  };

  // ✅ Handle preview
  const handlePreview = async (documentId, fileName) => {
    try {
      const isImage = fileName?.match(/\.(jpg|jpeg|png)$/i);
      const response = await axios.get(
        `http://localhost:3306/api/viewDocument/${documentId}`,
        { responseType: "blob" }
      );
      const blobUrl = URL.createObjectURL(response.data);
      if (isImage) setPreviewUrl(blobUrl);
      else window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error previewing document:", error);
      toast.error("Error previewing document. Please try again.");
    }
  };

  // ✅ Handle remove document
  const handleRemoveDocument = async (docType, documentId) => {
    const success = await removeUploadedDoc(docType, documentId);
    if (success) {
      // Update form status after removal
      const allUploaded = checkAllDocumentsUploaded();
      updateFormStatus(
        "photographAndDocument",
        allUploaded ? "Completed" : "Pending"
      );
    }
  };

  // ✅ Manual retry function (optional)
  const handleRetryFetch = async () => {
    resetFetchState(); // Reset the fetch state
    await fetchUploadedDocuments();
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Photograph And Documents</h4>

      {/* Error Display */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
          {fetchAttempts >= maxFetchAttempts && (
            <div className="mt-2">
              <button
                className="btn btn-sm btn-warning"
                onClick={handleRetryFetch}
              >
                Retry Loading Documents
              </button>
            </div>
          )}
        </div>
      )}

      {/* Loading State with Retry Info */}
      {loading && fetchAttempts > 0 && (
        <div className="alert alert-info" role="alert">
          <strong>Loading documents...</strong>
          {fetchAttempts > 1 &&
            ` (Attempt ${fetchAttempts}/${maxFetchAttempts})`}
        </div>
      )}

      <form
        onSubmit={handleUpload}
        className="formContainer formInnerContainer pb-5"
        style={{ position: "relative" }}
      >
        {loading && fetchAttempts === 0 ? (
          <SkeletonLoader length={2} />
        ) : (
          <>
            <div
              className="text-white text-center px-3 py-1"
              style={{
                backgroundColor: "grey",
                maxWidth: "fit-content",
                fontSize: ".8rem",
              }}
            >
              Kindly upload all relevant documents as mentioned in the checklist
              item.
            </div>

            <div className="inputContainer">
              <label htmlFor="documentType">
                <span className="required">*</span>Document Type:
              </label>
              <select
                name="documentType"
                id="documentType"
                className="col-6"
                required
                value={selectedDoc}
                onChange={(e) => setSelectedDoc(e.target.value)}
                disabled={loading && fetchAttempts > 0}
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {availableDocs.map((doc) => (
                  <option key={doc.value} value={doc.value}>
                    {doc.label}
                  </option>
                ))}
              </select>
            </div>

            <InputContainer
              inputType="file"
              required
              title="Upload Attachment"
              onChange={handleFileChange}
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              disabled={loading && fetchAttempts > 0}
            />
          </>
        )}

        <div
          className="buttonContainer"
          style={{ position: "absolute", bottom: "0px", right: "0px" }}
        >
          <button
            className="button buttonNotFilled"
            type="submit"
            disabled={loading || (fetchAttempts >= maxFetchAttempts && error)}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      <hr />
      <h4>Uploaded Documents</h4>

      <div className="p-3 d-flex flex-column">
        {loading && fetchAttempts > 0 ? (
          <SkeletonLoader length={3} />
        ) : uploadedDocs.length === 0 ? (
          <p className="text-muted">
            {error && fetchAttempts >= maxFetchAttempts
              ? "Unable to load documents. Please try again."
              : "No documents uploaded yet."}
          </p>
        ) : (
          uploadedDocs.map((doc) => (
            <UploadedDoc
              key={doc.documentId || doc.docType}
              docName={doc.docName}
              fileName={doc.fileName}
              fileSize={doc.fileSize}
              uploadDate={doc.uploadDate}
              onRemove={() => handleRemoveDocument(doc.docType, doc.documentId)}
              onPreview={() => handlePreview(doc.documentId, doc.fileName)}
              isImage={doc.fileName?.match(/\.(jpg|jpeg|png)$/i)}
            />
          ))
        )}
      </div>

      {/* Progress Indicator */}
      {!loading && (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Upload Progress:</span>
            <span>{uploadedDocs.length} of 6 documents uploaded</span>
          </div>
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(uploadedDocs.length / 6) * 100}%` }}
              aria-valuenow={uploadedDocs.length}
              aria-valuemin="0"
              aria-valuemax="6"
            ></div>
          </div>
          {checkAllDocumentsUploaded() && (
            <div className="alert alert-success mt-3" role="alert">
              <strong>All documents uploaded successfully!</strong> You can now
              Print Form and Challan.
            </div>
          )}
        </div>
      )}

      {previewUrl && (
        <div
          className="overlay"
          onClick={() => setPreviewUrl(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotographAndDocument;
