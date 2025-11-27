import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../assets/logo.png";

export default function TestSlipLayout({ data }) {
  // Safely extract data with proper array/object handling
  const personalInfo = Array.isArray(data?.data?.personal_info)
    ? data?.data?.personal_info[0] || {}
    : data?.data?.personal_info || {};

  const programInfo = Array.isArray(data?.data?.program_of_study)
    ? data?.data?.program_of_study[0] || {}
    : data?.data?.program_of_study || {};

  const admissionSchedule = Array.isArray(data?.data?.admission_schedule)
    ? data?.data?.admission_schedule[0] || {}
    : data?.data?.admission_schedule || {};

  const uploadedDocs = data?.data?.uploaded_docs || [];

  // Get current date for printing
  const currentDate = new Date().toLocaleDateString("en-GB");
  const currentTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "";
    }
  };

  // Extract test details from admission_schedule with fallbacks
  const testDate = admissionSchedule.test_date
    ? formatDate(admissionSchedule.test_date)
    : "To be announced";

  const reportingTime = admissionSchedule.reporting_time || "09:00 AM";
  const testTime = admissionSchedule.test_time || "11:00 AM";
  const venue =
    admissionSchedule.test_venue || "Shah Abdul Latif University Ghotki Campus";

  // Extract candidate photo - similar to FormPDFLayout
  const passportPhoto = uploadedDocs.find(
    (doc) => doc.docType === "passportsizephoto"
  );

  // Dynamic data
  const slipData = {
    testId: personalInfo.entry_test_roll_no,
    blockNo: personalInfo.block_no || "To be assigned",
    fullName: `${personalInfo.first_name || ""} ${
      personalInfo.last_name || ""
    }`.trim(),
    fatherName: data?.data?.father_info?.[0]?.name || "",
    cnic: personalInfo.cnic,
    department: programInfo.applied_department,
    testDate: testDate,
    reportingTime: reportingTime,
    testTime: testTime,
    venue: venue,
    printedDate: currentDate,
    printedTime: currentTime,
  };

  // If essential data is missing, show a message
  if (!slipData.testId || !slipData.fullName || !slipData.cnic) {
    return (
      <div className="container p-4 text-center">
        <h5>Incomplete data for test slip generation</h5>
        <p>Please ensure all required information is available.</p>
      </div>
    );
  }

  return (
    <div
      className="container p-4"
      style={{ maxWidth: "800px", border: "1px solid #000" }}
    >
      {/* Header */}
      <div className="d-flex flex-row justify-content-center align-items-center text-center">
        <img src={logo} alt="" style={{ width: "130px" }} />
        <div>
          <h4 className="fw-bold">
            SHAH ABDUL LATIF UNIVERSITY, GHOTKI CAMPUS
          </h4>
          <h5 className="fw-bold">Pre-Entry Test for BS/BBA (Part-I)</h5>
          <h6 className="fw-bold">
            Academic Year {admissionSchedule.admission_year || "2026"}
          </h6>
          <h6 className="fw-bold text-decoration-underline">
            PRE ENTRY TEST PERMIT
          </h6>
        </div>
      </div>

      {/* Department Title */}
      <div
        className="mt-3 p-2 text-white fw-bold"
        style={{ background: "#000" }}
      >
        Applied Department: {slipData.department || "Department not specified"}
      </div>

      {/* Info Box */}
      <div className="border p-3">
        <div className="row">
          <div className="col-8">
            <table className="table table-bordered mb-0">
              <tbody>
                <tr>
                  <th style={{ width: "35%" }}>TEST ID#</th>
                  <td>{slipData.testId}</td>
                </tr>
                <tr>
                  <th>BLOCK NO</th>
                  <td>{slipData.blockNo}</td>
                </tr>
                <tr>
                  <th>FULL NAME</th>
                  <td>{slipData.fullName}</td>
                </tr>
                <tr>
                  <th>FATHER'S NAME</th>
                  <td>{slipData.fatherName}</td>
                </tr>
                <tr>
                  <th>CNIC</th>
                  <td>{slipData.cnic}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Photo - Updated to match FormPDFLayout style */}
          <div className="col-4 text-center">
            {passportPhoto ? (
              <img
                src={`http://localhost:3306/api/viewDocument/${passportPhoto.id}`}
                alt="Passport Photo"
                className="img-fluid mx-auto"
                style={{
                  width: "180px",
                  height: "210px",
                  objectFit: "cover",
                  border: "1px solid #000",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  // Show placeholder if image fails to load
                  const placeholder = document.createElement("div");
                  placeholder.className = "passport-photo-placeholder";
                  placeholder.style.cssText = `
                    width: 180px;
                    height: 210px;
                    border: 1px solid #000;
                    background-color: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                  `;
                  placeholder.innerHTML =
                    '<span class="text-muted small">Photo Not Loaded</span>';
                  e.target.parentNode.appendChild(placeholder);
                }}
              />
            ) : (
              <div
                className="passport-photo border border-dark d-flex align-items-center justify-content-center mx-auto"
                style={{
                  width: "180px",
                  height: "210px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <span className="text-muted small">No Photo Uploaded</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test Details - Updated to use paragraph format without table */}
      <div
        className="text-center fw-bold mt-3"
        style={{ background: "#000", color: "#fff", padding: "10px" }}
      >
        <p className="mb-1">TEST DATE: {slipData.testDate}</p>
        <p className="mb-1">REPORTING TIME: {slipData.reportingTime}</p>
        <p className="mb-1">TEST TIME: {slipData.testTime}</p>
        <p className="mb-1">VENUE: {slipData.venue}</p>
      </div>

      {/* Signatures */}
      <div className="row text-center" style={{ marginTop: "95px" }}>
        <div className="col-6">
          <div
            style={{
              borderTop: "1px solid #000",
              width: "80%",
              margin: "auto",
            }}
          ></div>
          <p className="mt-1 fw-bold">Candidate's Signature</p>
        </div>
        <div className="col-6">
          <div
            style={{
              borderTop: "1px solid #000",
              width: "80%",
              margin: "auto",
            }}
          ></div>
          <p className="mt-1 fw-bold">Authorized Person's Signature</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4">
        <h5 className="fw-bold">INSTRUCTIONS</h5>
        <ol className="lh-lg">
          <li>Entry is prohibited without Entry-Test Permit.</li>
          <li>Bring your Original CNIC/Form-B.</li>
          <li>Be Seated 30 minutes before Pre-Entry Test at Test Hall.</li>
          <li>
            No any Gadget i.e. (Phone, Mobile, Calculator, Notebook etc.) is
            allowed at Test Venue.
          </li>
          <li>Pencil will be provided at Test Venue.</li>
        </ol>
      </div>

      {/* Printed Date */}
      <p className="text-end fw-bold mt-3">
        Printed on: {slipData.printedDate} at {slipData.printedTime}
      </p>
    </div>
  );
}
