import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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

  const {
    availableDocs,
    selectedDoc,
    file,
    uploadedDocs,
    loading,
    fetchUploadedDocuments,
    setSelectedDoc,
    setFile,
    uploadDocument,
    removeUploadedDoc,
  } = useDocumentStore();

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

      if (allowedTypes.includes(uploadedFile.type)) {
        setFile(uploadedFile);
      } else {
        alert("Invalid file type. Please upload JPEG, PNG, PDF, or DOC files.");
        fileInputRef.current.value = "";
      }
    }
  };

  // ✅ Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const success = await uploadDocument(updateFormStatus);
    if (success) fileInputRef.current.value = "";
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
      alert("Error previewing document. Check backend response type.");
    }
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Photograph And Documents</h4>

      <form
        onSubmit={handleUpload}
        className="formContainer formInnerContainer pb-5"
        style={{ position: "relative" }}
      >
        {loading ? (
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
            />
          </>
        )}

        <div
          className="buttonContainer"
          style={{ position: "absolute", bottom: "0px", right: "0px" }}
        >
          <button className="button buttonNotFilled" type="submit">
            Upload
          </button>
        </div>
      </form>

      <hr />
      <h4>Uploaded Documents</h4>

      <div className="p-3 d-flex flex-column">
        {uploadedDocs.length === 0 ? (
          <p className="text-muted">No documents uploaded yet.</p>
        ) : (
          uploadedDocs.map((doc) => (
            <UploadedDoc
              key={doc.documentId || doc.docType}
              docName={doc.docName}
              fileName={doc.fileName}
              fileSize={doc.fileSize}
              uploadDate={doc.uploadDate}
              onRemove={() =>
                removeUploadedDoc(doc.docType, doc.documentId, updateFormStatus)
              }
              onPreview={() => handlePreview(doc.documentId, doc.fileName)}
              isImage={doc.fileName?.match(/\.(jpg|jpeg|png)$/i)}
            />
          ))
        )}
      </div>

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
