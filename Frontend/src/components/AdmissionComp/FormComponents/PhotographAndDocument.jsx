import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import InputContainer from "../InputContainer";
import UploadedDoc from "../UploadedDoc";
import SkeletonLoader from "../SkeletonLoader.jsx";
import useDocumentStore from "../../../contexts/useDocumentStore";
import Cookies from "js-cookie";

const PhotographAndDocument = () => {
  const [loading, setLoading] = useState(true);
  const {
    availableDocs,
    selectedDoc,
    file,
    setSelectedDoc,
    setFile,
    addUploadedDoc,
    uploadedDocs,
    removeUploadedDoc,
  } = useDocumentStore();
  const fileInputRef = useRef(null);
  const cnic = Cookies.get("cnic");
  const [base64Files, setBase64Files] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // State for preview image

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      setFile(uploadedFile);
    } else {
      alert("Please upload an image file only.");
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedDoc && file) {
      try {
        const docLabel = availableDocs.find(
          (doc) => doc.value === selectedDoc
        ).label;

        // Create a FormData object
        const formData = new FormData();
        formData.append("cnic", cnic);
        formData.append("docType", selectedDoc);
        formData.append("docName", docLabel);
        formData.append("file", file);

        console.log(...formData);

        // Send the data to the database
        const response = await axios.post(
          "http://localhost:3306/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type for file upload
            },
          }
        );

        // Handle the response from the server
        if (response.data.message === "Document uploaded successfully!") {
          alert("File uploaded successfully!");
          // Add the uploaded document to the state
          addUploadedDoc({
            docType: selectedDoc,
            docName: docLabel,
            filePath: response.data.filePath, // Assuming the server returns the file path
          });
        } else {
          alert("Failed to upload file.");
        }

        // Clear the file input
        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(
          error.response?.data?.message ||
            "An error occurred while uploading the file."
        );
      }
    } else {
      alert("Please select a document type and upload a file.");
    }
  };

  // Function to handle removing a document
  const handleRemove = (docType) => {
    removeUploadedDoc(docType);
  };

  // Function to handle previewing an image
  const handlePreview = (file) => {
    setPreviewImage(file);
  };

  // Function to close the preview modal
  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Photograph And Document</h4>
      <form
        onSubmit={handleUpload}
        className="formContainer formInnerContainer pb-5"
        style={{ position: "relative" }}
      >
        {loading && <SkeletonLoader length={2} />}
        {!loading && (
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
              title={"Upload Attachment"}
              onChange={handleFileChange}
              ref={fileInputRef}
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
      <h4>Uploaded Document</h4>
      <div className="p-3 d-flex flex-column">
        {uploadedDocs.map((doc) => (
          <UploadedDoc
            key={doc.docType}
            docName={doc.docName}
            onRemove={() => handleRemove(doc.docType)}
            onPreview={() => handlePreview(doc.file)}
          />
        ))}
      </div>
      <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
        <button className="button buttonFilled">Save & Proceed</button>
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="image-preview-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closePreview}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotographAndDocument;
