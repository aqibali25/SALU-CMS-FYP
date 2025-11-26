import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../pages/Admission/Admission.css";
import logo from "../../../assets/logo.png";

export default function FormPDFLayout() {
  return (
    <div
      className="form-container border border-dark  mt-4"
      style={{ width: "100%" }}
    >
      {/* Header with logo and QR */}
      <div className="row text-center align-items-center border-bottom p-2">
        <div className="col-2">
          <img src={logo} alt="" className="img-fluid" />
        </div>

        <div className="col-8">
          <h5 className="fw-bold">
            SHAH ABDUL LATIF UNIVERSITY, GHOTKI CAMPUS
          </h5>
          <p className="small m-0">Application Form For Admission</p>
          <p className="small m-0">
            Bachelor & BS-I / BBA-I Degree Programs for
          </p>
          <p className="small m-0">the Academic Year 2026</p>
        </div>
      </div>

      {/* Program Row */}
      <div className="row border-bottom border-dark text-center p-2 fw-bold">
        <div className="col-6 border-end border-dark">
          Name of Program: BS Computer Science
        </div>
        <div className="col-6">Morning</div>
      </div>

      {/* PERSONAL INFO */}
      <div className="section-title">A. PERSONAL INFORMATION:</div>

      <table className="table table-bordered border-dark">
        <tbody>
          <tr>
            <td>1. Name:</td>
            <td colSpan={3}>Muhammad Sheeraz</td>
            <td rowSpan={6} className="text-center">
              {/* PHOTO BOX */}
              <div
                className="passport-photo"
                style={{ width: "180px", height: "210px" }}
              ></div>
            </td>
          </tr>
          <tr>
            <td>2. Father's Name:</td>
            <td colSpan={3}>Sardar Ali</td>
          </tr>
          <tr>
            <td>3. Surname:</td>
            <td colSpan={3}>Kalwar</td>
          </tr>
          <tr>
            <td>4. Gender:</td>
            <td colSpan={3}>Male</td>
          </tr>
          <tr>
            <td>5. Guardian Name:</td>
            <td colSpan={3}>Sardar Ali</td>
          </tr>
          <tr>
            <td>6. CNIC No:</td>
            <td colSpan={3}>4510246363433</td>
          </tr>
        </tbody>
      </table>

      <table className="table table-bordered border-dark">
        <tbody>
          <tr>
            <td>7. Date of Birth:</td>
            <td>14 Aug 2006</td>
            <td>8. Current Address:</td>
            <td>Village Changlani PO Adilpur</td>
          </tr>
          <tr>
            <td>9. Permanent Address:</td>
            <td colSpan={3}>Ghotki</td>
          </tr>
          <tr>
            <td>10. Nationality:</td>
            <td>Pakistani</td>
            <td>11. Religion:</td>
            <td>Islam</td>
          </tr>
          <tr>
            <td>12. Domicile:</td>
            <td>Sindh</td>
            <td>13. Mobile:</td>
            <td>03269231783</td>
          </tr>
          <tr>
            <td>14. Email Address:</td>
            <td colSpan={3}>muhammadsheeraz592@gmail.com</td>
          </tr>
        </tbody>
      </table>

      {/* Yes/No Section */}
      <table className="table table-bordered border-dark">
        <tbody>
          <tr>
            <td>15. Are you employed anywhere?</td>
            <td>No</td>
          </tr>
          <tr>
            <td>16. Considered for self-finance?</td>
            <td>No</td>
          </tr>
          <tr>
            <td>17. Hostel?</td>
            <td>No</td>
          </tr>
          <tr>
            <td>18. Transportation?</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      {/* Academic table */}
      <div className="section-title">B. ACADEMIC RECORD:</div>

      <table className="table table-bordered border-dark text-center">
        <thead className="table-secondary">
          <tr>
            <th>Examination</th>
            <th>Degree Name</th>
            <th>Group / Major Subjects</th>
            <th>Year</th>
            <th>Seat No</th>
            <th>Obtained Marks</th>
            <th>Total Marks</th>
            <th>Board</th>
            <th>University</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Matric</td>
            <td>-</td>
            <td>Science</td>
            <td>2022</td>
            <td>119602</td>
            <td>889</td>
            <td>1100</td>
            <td>BISE Sukkur</td>
            <td>Al Rahman Model Public School Khuhara</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Intermediate</td>
            <td>-</td>
            <td>Pre - Engineering</td>
            <td>2022</td>
            <td>119602</td>
            <td>889</td>
            <td>1100</td>
            <td>BISE Sukkur</td>
            <td>Al Rahman Model Public School Khuhara</td>
          </tr>
        </tbody>
      </table>

      {/* CHOICE SECTION */}
      <div className="section-title">
        C. CHOICE OF PROGRAM FOR ADMISSION IN ORDER OF PREFERENCE:
      </div>

      <table className="table table-bordered border-dark text-center">
        <tbody>
          <tr>
            <td>01.</td>
            <td></td>
          </tr>
          <tr>
            <td>02.</td>
            <td></td>
          </tr>
          <tr>
            <td>03.</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* UNDERTAKING */}
      <div className="border border-dark p-3 mb-2">
        <p className="small">
          I hereby undertake that the entire details made in admission form are
          correct...
        </p>
        <div className="row">
          <div className="col-6">Dated: ___/___/2025</div>
          <div className="col-6 text-end">Signature: __________</div>
        </div>
      </div>

      <p className="text-end fw-bold">Form Fees Rs. 2,500</p>
    </div>
  );
}
