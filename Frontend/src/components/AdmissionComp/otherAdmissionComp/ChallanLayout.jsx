import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../pages/Admission/Admission.css";
import logo from "../../../assets/logo.png";

export default function ChallanLayout() {
  const copies = ["Bank Copy", "University Copy", "Admin Copy", "Student Copy"];

  return (
    <div className="container challan-container">
      <div className="row">
        {copies.map((title, i) => (
          <div className="col-3 challan-column mr-2" key={i}>
            <div className="text-center fw-bold border-bottom p-1">{title}</div>
            <div className="text-center pt-2">
              <div className="logo-box mb-1">
                <img src={logo} alt="logo" className="img-fluid" />
              </div>
              <h6>BANK CHALLAN</h6>
            </div>

            <table className="table table-bordered challan-table mb-0">
              <tbody>
                <tr>
                  <td>Date of Issue</td>
                  <td>19-09-2025</td>
                </tr>
                <tr>
                  <td>Due Date</td>
                  <td>22-09-2025</td>
                </tr>
                <tr>
                  <td>Date of Payment</td>
                  <td>Challan#</td>
                </tr>
                <tr>
                  <td>Challan Printed Date:</td>
                  <td>19-09-2025</td>
                </tr>
              </tbody>
            </table>

            <div className="p-1 border border-top-0">
              Please Received and Credit to SALU
            </div>

            <div className="p-1 border border-top-0 small fw-bold">
              Please deposit your fees through HBL connect/ HBL mobile banking
              in Salu Regular admission fees head.
            </div>

            <table className="table table-bordered challan-table">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>Muhammad Sheeraz</td>
                </tr>
                <tr>
                  <td>F/Name:</td>
                  <td>Sardar Ali</td>
                </tr>
                <tr>
                  <td>Department:</td>
                  <td>Computer Science</td>
                </tr>
                <tr>
                  <td>Program:</td>
                  <td>BS Computer Science</td>
                </tr>
                <tr>
                  <td>Contact#:</td>
                  <td>03269231783</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>Ghotki</td>
                </tr>
                <tr>
                  <td>CNIC No:</td>
                  <td>45102462634433</td>
                </tr>
              </tbody>
            </table>

            <table className="table table-bordered challan-table">
              <tbody>
                <tr>
                  <td>Application Processing Fee</td>
                  <td>2500</td>
                </tr>
                <tr>
                  <td>Admission Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Late Fee</td>
                  <td></td>
                </tr>
                <tr className="fw-bold">
                  <td>Total Amount</td>
                  <td>2500</td>
                </tr>
              </tbody>
            </table>

            <div className="border border-top-0 p-1 small">
              Rupees (in words)
            </div>

            <div className="text-center small fw-bold p-1">
              Two Thousand Five Hundred rupees only
            </div>
          </div>
        ))}
      </div>

      {/* Footer signatures */}
      <div className="row text-center mt-2">
        {copies.map((c, i) => (
          <div key={i} className="col-3">
            <div className="d-flex justify-content-between small">
              <span>Depositor's Signature</span>
              <span>Authorized Signature</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
