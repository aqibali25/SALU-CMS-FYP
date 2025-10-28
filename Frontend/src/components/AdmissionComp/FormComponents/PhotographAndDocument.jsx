import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import InputContainer from "../InputContainer";
import UploadedDoc from "../UploadedDoc";
import SkeletonLoader from "../SkeletonLoader.jsx";
import useDocumentStore from "../../../contexts/useDocumentStore";
import Cookies from "js-cookie";

const PhotographAndDocument = () => {
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const cnic = Cookies.get("cnic");

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

  // ✅ Fetch uploaded documents once
  useEffect(() => {
    const fetchUploadedDocuments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3306/api/getUploadedDocuments/${cnic}`
        );
        console.log("Fetched uploaded documents:", response.data);
        if (response.data?.length) {
          response.data.forEach((doc) => {
            const exists = uploadedDocs.some(
              (d) => d.documentId === doc.id || d.docType === doc.docType
            );
            if (!exists) {
              addUploadedDoc({
                docType: doc.docType,
                docName: doc.docName,
                fileName: doc.fileName,
                documentId: doc.id,
                fileSize: doc.fileSize,
                uploadDate: doc.uploadDate,
              });
            }
          });
        }
      } catch (error) {
        console.error("Error fetching uploaded documents:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cnic) fetchUploadedDocuments();
  }, [cnic]);

  // ✅ File selection validation
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
        alert("Invalid file type. Please upload JPEG, PNG, PDF, or DOC.");
        fileInputRef.current.value = "";
      }
    }
  };

  // ✅ Upload document
  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedDoc && file) {
      try {
        const docLabel =
          availableDocs.find((doc) => doc.value === selectedDoc)?.label ||
          selectedDoc;

        const formData = new FormData();
        formData.append("cnic", cnic);
        formData.append("docType", selectedDoc);
        formData.append("docName", docLabel);
        formData.append("document", file);

        const response = await axios.post(
          "http://localhost:3306/api/uploadDocument",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 30000,
          }
        );

        if (response.data.message === "Document uploaded successfully!") {
          alert("File uploaded successfully!");
          addUploadedDoc({
            docType: selectedDoc,
            docName: docLabel,
            fileName: response.data.fileName,
            documentId: response.data.documentId,
            fileSize: response.data.fileSize,
            uploadDate: new Date().toISOString(),
          });

          setSelectedDoc("");
          setFile(null);
          fileInputRef.current.value = "";
        } else {
          alert("Failed to upload file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Upload failed. Please try again.");
      }
    } else {
      alert("Please select a document type and file.");
    }
  };

  // ✅ Remove document
  const handleRemove = async (docType, documentId) => {
    try {
      if (documentId) {
        await axios.delete(
          `http://localhost:3306/api/deleteDocument/${documentId}`
        );
      }
      removeUploadedDoc(docType);
      alert("Document removed successfully!");
    } catch (error) {
      console.error("Error removing document:", error);
      alert("Failed to remove document.");
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
          // ✅ Filter out duplicate image documents before rendering
          uploadedDocs
            .filter((doc, index, self) => {
              // Keep only one image per fileName or docType
              if (doc.fileName?.match(/\.(jpg|jpeg|png)$/i)) {
                return (
                  index ===
                  self.findIndex(
                    (d) =>
                      d.fileName === doc.fileName || d.docType === doc.docType
                  )
                );
              }
              return true; // non-images always included
            })
            .map((doc) => (
              <UploadedDoc
                key={doc.documentId || doc.docType}
                docName={doc.docName}
                fileName={doc.fileName}
                fileSize={doc.fileSize}
                uploadDate={doc.uploadDate}
                onRemove={() => handleRemove(doc.docType, doc.documentId)}
                onDownload={() => handleDownload(doc.documentId, doc.fileName)}
                onPreview={() => handlePreview(doc.documentId, doc.fileName)}
                isImage={doc.fileName?.match(/\.(jpg|jpeg|png)$/i)}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default PhotographAndDocument;
