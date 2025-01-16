import { FaEye, FaTrash, FaImage } from "react-icons/fa";

const UploadedDoc = ({ docName }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-between p-2"
      style={{
        maxWidth: "68%",
      }}
    >
      <style jsx>{`
        @media (max-width: 865px) {
          div {
            max-width: 100% !important;
          }
        }
      `}</style>
      <div className="d-flex align-items-center">
        <FaImage
          className="me-2"
          style={{ fontSize: "24px", color: "#6c757d" }}
        />
        <span style={{ fontWeight: "500" }}>{docName}</span>
      </div>
      <div className="d-flex">
        <FaEye
          className="me-3"
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "#007bff",
          }}
          title="View"
        />
        <FaTrash
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "#dc3545",
          }}
          title="Remove"
        />
      </div>
    </div>
  );
};

export default UploadedDoc;
