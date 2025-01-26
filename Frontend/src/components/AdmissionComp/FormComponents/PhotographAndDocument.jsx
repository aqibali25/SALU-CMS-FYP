import React, { useEffect, useReducer, useRef, useState } from "react";
import InputContainer from "../InputContainer";
import UploadedDoc from "../UploadedDoc";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader.jsx";

// Define initial state
const initialState = {
  availableDocs: [
    { value: "passportsizephoto", label: "Passport Size Photo" },
    { value: "cnic", label: "CNIC/B-Form" },
    { value: "marksheet12", label: "12th Mark Sheet" },
    { value: "marksheet10", label: "10th Mark Sheet" },
    { value: "domicileB", label: "Domicile (For Bachelors)" },
    { value: "domicileCert", label: "Domicile Certificate" },
  ],
  uploadedDocs: [],
  selectedDoc: "",
  file: null,
  fileData: null,
  uploading: false,
  uploadDisabled: false,
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_DOC":
      return { ...state, selectedDoc: action.payload };
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "ADD_UPLOADED_DOC":
      return {
        ...state,
        uploadedDocs: [...state.uploadedDocs, action.payload],
        availableDocs: state.availableDocs.filter(
          (doc) => doc.value !== action.payload.docType
        ),
        selectedDoc: "",
        file: null,
        fileData: null,
      };
    case "REMOVE_UPLOADED_DOC":
      const removedDoc = state.uploadedDocs.find(
        (doc) => doc.docType === action.payload
      );
      return {
        ...state,
        uploadedDocs: state.uploadedDocs.filter(
          (doc) => doc.docType !== action.payload
        ),
        availableDocs: [
          ...state.availableDocs,
          { value: removedDoc.docType, label: removedDoc.docName },
        ],
      };
    case "SET_FILE_DATA":
      return { ...state, fileData: action.payload };
    case "SET_UPLOADING":
      return { ...state, uploading: action.payload };
    case "DISABLE_UPLOAD":
      return { ...state, uploadDisabled: true };
    default:
      return state;
  }
};

const PhotographAndDocument = () => {
  const [loading, setLoading] = useState(true); // State to track loading state
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateFormStatus } = useFormStatus(); // Call useFormStatus to access its properties
  const navigate = useNavigate(); // Define navigate for redirection
  const fileInputRef = useRef(null);
  const initialStateLength = initialState.availableDocs.length;
  const [previewImage, setPreviewImage] = useState(null);

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
      setLoading(false); // Set loading to false after a delay
    }, 800);

    return () => clearTimeout(timer); // Clear timeout to avoid memory leaks
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      dispatch({ type: "SET_FILE", payload: uploadedFile });
    } else {
      alert("Please upload an image file only.");
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (state.selectedDoc && state.file) {
      try {
        const docLabel = state.availableDocs.find(
          (doc) => doc.value === state.selectedDoc
        ).label;

        const base64File = await convertToBase64(state.file);

        dispatch({
          type: "ADD_UPLOADED_DOC",
          payload: {
            docType: state.selectedDoc,
            docName: docLabel,
            file: base64File,
          },
        });

        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error converting file to Base64", error);
      }
    }
  };

  const handleRemove = (docType) => {
    dispatch({ type: "REMOVE_UPLOADED_DOC", payload: docType });
  };

  const handlePreview = (file) => {
    setPreviewImage(file);

    // const previewWindow = window.open("", "_blank");
    // const imageElement = new Image();
    // imageElement.src = file;
    // previewWindow.document.body.appendChild(imageElement);
  };
  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleSaveAndProceed = () => {
    dispatch({ type: "SET_UPLOADING", payload: true });
    console.log("Uploading documents:", state.uploadedDocs);

    setTimeout(() => {
      console.log("All documents uploaded successfully");
      dispatch({ type: "DISABLE_UPLOAD" });
    }, 2000);

    updateFormStatus("photographAndDocument", "Completed");
    navigate("/SALU-CMS-FYP/admissions/form");
  };

  return (
    <div className="formConitainer p-4">
      <h4>Photograph And Document</h4>
      <form
        onSubmit={handleUpload}
        className="formContainer formInnerContainer pb-5"
        style={{
          position: "relative",
        }}
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
                value={state.selectedDoc}
                onChange={(e) =>
                  dispatch({
                    type: "SET_SELECTED_DOC",
                    payload: e.target.value,
                  })
                }
                disabled={state.uploadDisabled}
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {state.availableDocs.map((doc) => (
                  <option key={doc.value} value={doc.value}>
                    {doc.label}
                  </option>
                ))}
              </select>
            </div>
            <InputContainer
              inputType="file"
              required={true}
              title={"Upload Attachment"}
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={state.uploadDisabled}
            ></InputContainer>
          </>
        )}
        <div
          className="buttonContainer"
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
          }}
        >
          <button
            className="button buttonNotFilled"
            type="submit"
            disabled={state.uploadDisabled}
          >
            Upload
          </button>
        </div>
      </form>
      <hr />
      <h4>Uploaded Document</h4>
      <div className="p-3 d-flex flex-column">
        {state.uploadedDocs.map((doc) => (
          <UploadedDoc
            key={doc.docType}
            docName={doc.docName}
            onRemove={() => handleRemove(doc.docType)}
            onPreview={() => handlePreview(doc.file)}
          />
        ))}
      </div>

      <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
        <button
          className="button buttonFilled"
          onClick={handleSaveAndProceed}
          disabled={
            state.uploading || state.uploadedDocs.length !== initialStateLength
          }
        >
          Save & Proceed
        </button>
      </div>
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
