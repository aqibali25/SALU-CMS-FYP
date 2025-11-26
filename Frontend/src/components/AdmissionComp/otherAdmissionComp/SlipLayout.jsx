import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../assets/logo.png";
import image from "../../../assets/FacultyImages/Mr.ImranSiddique.jpg";

export default function SlipLayout() {
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
          <h6 className="fw-bold">Academic Year 2026</h6>
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
        Computer Science
      </div>

      {/* Info Box */}
      <div className="border p-3">
        <div className="row">
          <div className="col-8">
            <table className="table table-bordered mb-0">
              <tbody>
                <tr>
                  <th style={{ width: "35%" }}>TEST ID#</th>
                  <td>2100169</td>
                </tr>
                <tr>
                  <th>BLOCK NO</th>
                  <td>5</td>
                </tr>
                <tr>
                  <th>FULL NAME</th>
                  <td>Muhammad Sheeraz</td>
                </tr>
                <tr>
                  <th>FATHER'S NAME</th>
                  <td>Sardar Ali</td>
                </tr>
                <tr>
                  <th>CNIC</th>
                  <td>4510246363433</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Photo */}
          <div className="col-4 text-center">
            <img
              src={image}
              alt="candidate"
              style={{
                width: "180px",
                height: "210px",
                border: "1px solid #000",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* Test Details */}
      <div
        className="text-center mt-3 "
        style={{ background: "#000", color: "#fff", padding: "10px" }}
      >
        <p className="mb-1 fw-bold">TEST DATE: 14 Oct 2025</p>
        <p className="mb-1 fw-bold">REPORTING TIME: 09:00AM</p>
        <p className="mb-1 fw-bold">TEST TIME: 11:00AM</p>
        <p className="mb-1">VENUE: Shah Abdul Latif University Ghotki Campus</p>
      </div>

      {/* Signatures */}
      <div className="row text-center" style={{ marginTop: "130px" }}>
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
      <p className="text-end fw-bold mt-3">Printed on: 11-10-2025 at 4:40 PM</p>
    </div>
  );
}
