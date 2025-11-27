import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../pages/Admission/Admission.css";
import logo from "../../../assets/logo.png";

export default function FormPDFLayout({ data }) {
  // Extract data from API response
  if (!data || !data.data) {
    return (
      <div className="container text-center py-4">
        <div className="alert alert-warning" role="alert">
          No data available for form generation
        </div>
      </div>
    );
  }

  const apiData = data.data;
  const personalInfo = apiData.personal_info?.[0] || {};
  const programOfStudy = apiData.program_of_study?.[0] || {};
  const fatherInfo = apiData.father_info?.[0] || {};
  const admissionSchedule = apiData.admission_schedule?.[0] || {};
  const matriculation = apiData.matriculation?.[0] || {};
  const intermediate = apiData.intermediate?.[0] || {};
  const signUp = apiData.sign_up?.[0] || {};
  const uploadedDocs = apiData.uploaded_docs || [];

  // Get passport size photo from uploaded documents
  const passportPhoto = uploadedDocs.find(
    (doc) => doc.docType === "passportsizephoto"
  );

  // Format date to DD MMM YYYY
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

  // Format CNIC with dashes
  const formatCNIC = (cnic) => {
    if (!cnic) return "";
    return cnic.replace(/(\d{5})(\d{7})(\d{1})/, "$1-$2-$3");
  };

  // Get current year for form
  const currentYear = new Date().getFullYear();

  // Get program choices
  const programChoices = [
    programOfStudy.applied_department,
    programOfStudy.first_choice,
    programOfStudy.second_choice,
  ];

  return (
    <div className="pdf-wrapper">
      {/* Page 1 */}
      <div
        className="pdf-page page-1"
        style={{
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto 10mm auto",
          padding: "15mm",
          backgroundColor: "white",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          lineHeight: "1.3",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header with logo and QR */}
        <div className="row text-center align-items-center border-bottom p-2 mb-3">
          <div className="col-3">
            <img
              src={logo}
              alt="SALU GC Logo"
              className="img-fluid"
              style={{ maxHeight: "80px" }}
            />
          </div>

          <div className="col-6">
            <h5 className="fw-bold mb-1" style={{ fontSize: "16px" }}>
              SHAH ABDUL LATIF UNIVERSITY, GHOTKI CAMPUS
            </h5>
            <p className="small m-0">Application Form For Admission</p>
            <p className="small m-0">
              Bachelor & BS-I / BBA-I Degree Programs for
            </p>
            <p className="small m-0">
              the Academic Year{" "}
              {admissionSchedule.admission_year || currentYear}
            </p>
          </div>
        </div>

        {/* Program Row */}
        <div className="row border border-dark text-center p-2 fw-bold mb-3">
          <div className="col-6 border-end border-dark">
            Name of Program:{" "}
            {programOfStudy.applied_department || "Not Specified"}
          </div>
          <div className="col-6">
            Shift: {programOfStudy.shift || "Not Specified"}
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="section-title fw-bold border-bottom border-dark pb-1 mb-2">
          A. PERSONAL INFORMATION:
        </div>

        <table
          className="table table-bordered border-dark mb-3"
          style={{ fontSize: "11px" }}
        >
          <tbody>
            <tr>
              <td style={{ width: "20%" }}>1. Name:</td>
              <td style={{ width: "55%" }} colSpan={3}>
                {`${personalInfo.first_name || ""} ${
                  personalInfo.last_name || ""
                }`.trim() || "Not Provided"}
              </td>
              <td
                style={{ width: "25%", backgroundColor: "#f8f9fa" }}
                rowSpan={6}
                className="text-center align-middle"
              >
                {passportPhoto ? (
                  <img
                    src={`http://localhost:3306/api/viewDocument/${passportPhoto.id}`}
                    alt="Passport Photo"
                    className="img-fluid mx-auto"
                    style={{
                      width: "120px",
                      height: "150px",
                      objectFit: "cover",
                      border: "1px solid #000",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      // Show placeholder if image fails to load
                      const placeholder = document.createElement("div");
                      placeholder.className = "passport-photo-placeholder";
                      placeholder.style.cssText = `
                        width: 120px;
                        height: 150px;
                        border: 1px solid #000;
                        background-color: #f8f9fa;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto;
                      `;
                      placeholder.innerHTML =
                        '<span class="text-muted small">Photo Not Loaded <br/> Reload the Web and Download Again</span>';
                      e.target.parentNode.appendChild(placeholder);
                    }}
                  />
                ) : (
                  <div
                    className="passport-photo border border-dark d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      width: "120px",
                      height: "150px",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <span className="text-muted small">No Photo Uploaded</span>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>2. Father's Name:</td>
              <td colSpan={3}>{fatherInfo.name || "Not Provided"}</td>
            </tr>
            <tr>
              <td>3. Surname:</td>
              <td colSpan={3}>{personalInfo.surname || "Not Provided"}</td>
            </tr>
            <tr>
              <td>4. Gender:</td>
              <td colSpan={3}>
                {personalInfo.gender
                  ? personalInfo.gender.charAt(0).toUpperCase() +
                    personalInfo.gender.slice(1)
                  : "Not Provided"}
              </td>
            </tr>
            <tr>
              <td>5. Guardian Name:</td>
              <td colSpan={3}>{fatherInfo.name || "Not Provided"}</td>
            </tr>
            <tr>
              <td>6. CNIC No:</td>
              <td colSpan={3}>
                {formatCNIC(personalInfo.cnic) || "Not Provided"}
              </td>
            </tr>
          </tbody>
        </table>

        <table
          className="table table-bordered border-dark mb-3"
          style={{ fontSize: "11px" }}
        >
          <tbody>
            <tr>
              <td style={{ width: "20%" }}>7. Date of Birth:</td>
              <td style={{ width: "30%" }}>
                {formatDate(personalInfo.dob) || "Not Provided"}
              </td>
              <td style={{ width: "20%" }}>8. Current Address:</td>
              <td style={{ width: "30%" }}>
                {personalInfo.postal_address || "Not Provided"}
              </td>
            </tr>
            <tr>
              <td>9. Permanent Address:</td>
              <td colSpan={3}>
                {personalInfo.permanent_address || "Not Provided"}
              </td>
            </tr>
            <tr>
              <td>10. Nationality:</td>
              <td>Pakistani</td>
              <td>11. Religion:</td>
              <td>
                {personalInfo.religion
                  ? personalInfo.religion.charAt(0).toUpperCase() +
                    personalInfo.religion.slice(1)
                  : "Not Provided"}
              </td>
            </tr>
            <tr>
              <td>12. Domicile:</td>
              <td>
                {personalInfo.province +
                  (personalInfo.domicile_district
                    ? ", " + personalInfo.domicile_district
                    : "") || "Not Provided"}
              </td>
              <td>13. Mobile:</td>
              <td>
                {personalInfo.phone_no ||
                  fatherInfo.mobile_number ||
                  "Not Provided"}
              </td>
            </tr>
            <tr>
              <td>14. Email Address:</td>
              <td colSpan={3}>
                {signUp.EMAIL || personalInfo.email || "Not Provided"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Yes/No Section */}
        <table
          className="table table-bordered border-dark mb-3"
          style={{ fontSize: "11px" }}
        >
          <tbody>
            <tr>
              <td style={{ width: "70%" }}>15. Are you employed anywhere?</td>
              <td style={{ width: "30%" }}>{personalInfo.are_you_employed}</td>
            </tr>
            <tr>
              <td>16. Considered for self-finance?</td>
              <td>{personalInfo.self_finance}</td>
            </tr>
            <tr>
              <td>17. Hostel accommodation required?</td>
              <td>{personalInfo.hostel}</td>
            </tr>
            <tr>
              <td>18. Transportation required?</td>
              <td>{personalInfo.transport}</td>
            </tr>
          </tbody>
        </table>

        {/* Academic table */}
        <div className="section-title fw-bold border-bottom border-dark pb-1 mb-2">
          B. ACADEMIC RECORD:
        </div>

        <table
          className="table table-bordered border-dark text-center mb-3"
          style={{ fontSize: "10px" }}
        >
          <thead className="table-secondary">
            <tr>
              <th style={{ width: "12%" }}>Examination</th>
              <th style={{ width: "12%" }}>Group / Major</th>
              <th style={{ width: "8%" }}>Year</th>
              <th style={{ width: "10%" }}>Seat No</th>
              <th style={{ width: "10%" }}>Obtained Marks</th>
              <th style={{ width: "10%" }}>Total Marks</th>
              <th style={{ width: "10%" }}>Board</th>
              <th style={{ width: "18%" }}>School/College</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Matric</td>
              <td>{matriculation.group_name || "Not Provided"}</td>
              <td>{matriculation.degree_year || "Not Provided"}</td>
              <td>{matriculation.seat_no || "Not Provided"}</td>
              <td>{matriculation.marks_obtained || "Not Provided"}</td>
              <td>{matriculation.total_marks || "Not Provided"}</td>
              <td>{matriculation.board || "Not Provided"}</td>
              <td>{matriculation.institution_name || "Not Provided"}</td>
            </tr>
            <tr>
              <td>Intermediate</td>
              <td>{intermediate.group_name || "Not Provided"}</td>
              <td>{intermediate.degree_year || "Not Provided"}</td>
              <td>{intermediate.seat_no || "Not Provided"}</td>
              <td>{intermediate.marks_obtained || "Not Provided"}</td>
              <td>{intermediate.total_marks || "Not Provided"}</td>
              <td>{intermediate.board || "Not Provided"}</td>
              <td>{intermediate.institution_name || "Not Provided"}</td>
            </tr>
          </tbody>
        </table>

        {/* CHOICE SECTION */}
        <div className="section-title fw-bold border-bottom border-dark pb-1 mb-2">
          C. CHOICE OF PROGRAM FOR ADMISSION IN ORDER OF PREFERENCE:
        </div>

        <table
          className="table table-bordered border-dark mb-4"
          style={{ fontSize: "11px" }}
        >
          <tbody>
            {programChoices.map((choice, index) => (
              <tr key={index}>
                <td style={{ width: "50px", textAlign: "center" }}>
                  {String(index + 1).padStart(2, "0")}.
                </td>
                <td>{choice || "Not Specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Page 2 */}
      <div
        className="pdf-page page-2"
        style={{
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
          padding: "15mm",
          backgroundColor: "white",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          lineHeight: "1.3",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* ADDITIONAL INFORMATION */}
        <div className="section-title fw-bold border-bottom border-dark pb-1 mb-2">
          D. ADDITIONAL INFORMATION:
        </div>

        <table
          className="table table-bordered border-dark mb-4"
          style={{ fontSize: "11px" }}
        >
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Blood Group:</td>
              <td style={{ width: "70%" }}>
                {personalInfo.blood_group || "Not Provided"}
              </td>
            </tr>
            <tr>
              <td>Native Language:</td>
              <td>{personalInfo.native_language || "Not Provided"}</td>
            </tr>
            <tr>
              <td>Disability (if any):</td>
              <td>{personalInfo.disability || "None"}</td>
            </tr>
            <tr>
              <td>Father's Occupation:</td>
              <td>{fatherInfo.occupation || "Not Provided"}</td>
            </tr>
          </tbody>
        </table>

        {/* DECLARATION SECTION */}
        <div className="section-title fw-bold border-bottom border-dark pb-1 mb-2">
          E. DECLARATION:
        </div>

        <div
          className="border border-dark p-3 mb-4"
          style={{ fontSize: "11px" }}
        >
          <p className="mb-3">
            I hereby solemnly declare that the information provided in this
            application form is true and correct to the best of my knowledge. I
            understand that:
          </p>
          <ul className="small">
            <li>
              Any false information will result in cancellation of my admission
            </li>
            <li>All fees paid are non-refundable and non-transferable</li>
            <li>
              The university reserves the right to make changes in the admission
              policy
            </li>
            <li>I must abide by the rules and regulations of the university</li>
            <li>
              I will submit all required original documents for verification
            </li>
          </ul>

          <div className="row mt-4">
            <div className="col-6">
              <div className="border-top border-dark pt-2">
                <strong>Date:</strong> {new Date().toLocaleDateString("en-GB")}
              </div>
            </div>
            <div className="col-6 text-end">
              <div className="border-top border-dark pt-2">
                <strong>Signature of Applicant:</strong>
                <div style={{ marginTop: "20px" }}>
                  _________________________
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOR OFFICE USE ONLY */}
        <div className="section-title fw-bold border-bottom border-dark pb-1 mb-2">
          F. FOR OFFICE USE ONLY:
        </div>

        <table
          className="table table-bordered border-dark mb-4"
          style={{ fontSize: "11px" }}
        >
          <tbody>
            <tr>
              <td style={{ width: "25%" }}>Application No:</td>
              <td style={{ width: "25%" }}>________________</td>
              <td style={{ width: "25%" }}>Form Status:</td>
              <td style={{ width: "25%" }}>
                {personalInfo.form_status || "Pending"}
              </td>
            </tr>
            <tr>
              <td>Fee Status:</td>
              <td>{personalInfo.form_fee_status || "Unpaid"}</td>
              <td>Received By:</td>
              <td>________________</td>
            </tr>
            <tr>
              <td>Remarks:</td>
              <td colSpan={3}>
                ___________________________________________________
              </td>
            </tr>
          </tbody>
        </table>

        {/* FEE INFORMATION */}
        <div className="text-center border border-dark p-3 mt-4">
          <p className="fw-bold mb-1">Form Submission Fee</p>
          <p className="mb-0" style={{ fontSize: "14px" }}>
            Rs. {admissionSchedule.admission_form_fee} /-
          </p>
        </div>

        <div className="text-center mt-3">
          <p className="small text-muted mb-0">
            This is a computer generated form. No signature required for online
            submission.
          </p>
          <p className="small text-muted">
            Generated on: {new Date().toLocaleDateString("en-GB")} at{" "}
            {new Date().toLocaleTimeString("en-GB")}
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>
        {`
          @media print {
            body, html {
              margin: 0 !important;
              padding: 0 !important;
            }
            .pdf-wrapper {
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .pdf-page {
              page-break-after: always;
              margin: 0 !important;
              padding: 15mm !important;
              box-shadow: none !important;
              width: 210mm !important;
              min-height: 297mm !important;
              height: 297mm !important;
            }
            .pdf-page:last-child {
              page-break-after: auto;
            }
          }
          
          @media screen {
            .pdf-page {
              margin-bottom: 20px;
            }
          }
          
          .section-title {
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          
          .table td, .table th {
            padding: 4px 6px;
            vertical-align: middle;
          }
        `}
      </style>
    </div>
  );
}
