import React from "react";
import { FaEye, FaTrash, FaImage } from "react-icons/fa";
import "../../styles/UploadedDoc.css"; // Import the CSS file

const UploadedDoc = ({ docName, onRemove, onPreview }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between uploaded-doc-container">
        <div className="d-flex align-items-center">
          <FaImage className="me-2 fa-image" />
          <span className="doc-name">{docName}</span>
        </div>
        <div className="d-flex">
          <FaEye className="me-3 fa-eye" title="View" onClick={onPreview} />
          <FaTrash className="fa-trash" title="Remove" onClick={onRemove} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default UploadedDoc;
