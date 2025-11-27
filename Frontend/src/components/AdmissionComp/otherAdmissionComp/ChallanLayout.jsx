import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../pages/Admission/Admission.css";
import logo from "../../../assets/logo.png";

export default function ChallanLayout({ data }) {
  const copies = ["Bank Copy", "University Copy", "Admin Copy", "Student Copy"];

  if (!data || !data.data) {
    return (
      <div className="container text-center py-4">
        <div className="alert alert-warning" role="alert">
          No data available for challan generation
        </div>
      </div>
    );
  }

  // Extract data from API response
  const apiData = data.data;
  const personalInfo = apiData.personal_info?.[0] || {};
  const programOfStudy = apiData.program_of_study?.[0] || {};
  const fatherInfo = apiData.father_info?.[0] || {};
  const admissionSchedule = apiData.admission_schedule?.[0] || {};

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    } catch (error) {
      return "";
    }
  };

  // Convert number to words
  const numberToWords = (num) => {
    if (!num || num === 0) return "Zero rupees only";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 !== 0 ? " " + ones[num % 10] : "")
      );
    if (num < 1000)
      return (
        ones[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 !== 0 ? " and " + numberToWords(num % 100) : "")
      );
    if (num < 100000)
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand" +
        (num % 1000 !== 0 ? " " + numberToWords(num % 1000) : "")
      );
    if (num < 10000000)
      return (
        numberToWords(Math.floor(num / 100000)) +
        " Lakh" +
        (num % 100000 !== 0 ? " " + numberToWords(num % 100000) : "")
      );
    return (
      numberToWords(Math.floor(num / 10000000)) +
      " Crore" +
      (num % 10000000 !== 0 ? " " + numberToWords(num % 10000000) : "")
    );
  };

  // Calculate fees
  const applicationFee = parseInt(admissionSchedule.admission_form_fee) || 2500;
  const lateFee = 0;
  const totalAmount = applicationFee + lateFee;
  const amountInWords = numberToWords(totalAmount) + " rupees only";

  // Check if admission year matches for fee validation
  const isAdmissionYearValid =
    personalInfo.admission_year === admissionSchedule.admission_year;

  // Current date for challan
  const currentDate = new Date().toLocaleDateString("en-GB");
  const dueDate = formatDate(admissionSchedule.end_date);

  return (
    <div
      className="challan-pdf-container"
      style={{
        width: "280mm",
        minHeight: "210mm",
        margin: "0 auto",
        padding: "10mm",
        backgroundColor: "white",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        fontSize: "11px",
        lineHeight: "1.2",
      }}
    >
      <div className="row" style={{ height: "190mm" }}>
        <div
          className="col-14 challan-column d-flex flex-row justify-content-between align-items-center p-2"
          style={{ height: "700px" }}
        >
          {copies.map((title, copyIndex) => (
            <div
              className="challan-column"
              key={copyIndex}
              style={{
                width: "30%",
                border: "1px solid #000",
                padding: "5px",
                margin: "0 2px",
                height: "100%",
                boxSizing: "border-box",
              }}
              data-copy-type={title.toLowerCase().replace(" ", "-")}
            >
              {/* Copy Title */}
              <div
                className="text-center fw-bold border-bottom p-1 mb-2"
                style={{ fontSize: "12px", fontWeight: "bold" }}
                data-section="copy-title"
              >
                {title}
              </div>

              {/* Header Section */}
              <div className="text-center mb-2" data-section="header">
                <div className="logo-box mb-1">
                  <img
                    src={logo}
                    alt="SALU GC Logo"
                    className="img-fluid"
                    style={{ maxHeight: "100%" }}
                  />
                </div>
                <h3
                  className="mb-1"
                  data-title="institute-name"
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    margin: "5px 0",
                  }}
                >
                  {" Shah Abdul Latif University Ghotki Campus".toUpperCase}
                </h3>
                <h6 data-title="bank-challan">BANK CHALLAN</h6>
              </div>

              {/* Dates Table */}
              <table
                className="table table-bordered mb-1"
                style={{ fontSize: "9px", marginBottom: "8px" }}
                data-table-type="dates"
              >
                <tbody>
                  <tr data-row="date-issue">
                    <td style={{ width: "40%" }} data-label="date-of-issue">
                      Date of Issue
                    </td>
                    <td style={{ width: "60%" }} data-value="issue-date">
                      {currentDate}
                    </td>
                  </tr>
                  <tr data-row="due-date">
                    <td data-label="due-date">Due Date</td>
                    <td data-value="due-date-value">{dueDate}</td>
                  </tr>
                  <tr data-row="printed-date">
                    <td data-label="printed-date">Challan Printed Date:</td>
                    <td data-value="printed-date-value">{currentDate}</td>
                  </tr>
                </tbody>
              </table>

              {/* Instructions */}
              <div
                className="p-1 border border-top-0 text-center mb-1"
                style={{ fontSize: "9px", fontWeight: "bold" }}
                data-section="instructions"
              >
                Please Received and Credit to SALU GC
              </div>

              <div
                className="p-1 border border-top-0 small text-center mb-2"
                style={{ fontSize: "8px", fontWeight: "bold" }}
                data-section="banking-instructions"
              >
                Please deposit your fees through HBL connect/ HBL mobile banking
                in Salu Regular admission fees head.
              </div>

              {/* Personal Information Table */}
              <table
                className="table table-bordered mb-2"
                style={{ fontSize: "9px", marginBottom: "10px" }}
                data-table-type="personal-info"
              >
                <tbody>
                  <tr data-row="name">
                    <td style={{ width: "30%" }} data-label="name">
                      Name:
                    </td>
                    <td style={{ width: "70%" }} data-value="name-value">
                      {`${personalInfo.first_name || ""} ${
                        personalInfo.last_name || ""
                      }`.trim()}
                    </td>
                  </tr>
                  <tr data-row="father-name">
                    <td data-label="father-name">F/Name:</td>
                    <td data-value="father-name-value">
                      {fatherInfo.name || ""}
                    </td>
                  </tr>
                  <tr data-row="department">
                    <td data-label="department">Department:</td>
                    <td data-value="department-value">
                      {programOfStudy.applied_department || ""}
                    </td>
                  </tr>
                  <tr data-row="program">
                    <td data-label="program">Program:</td>
                    <td data-value="program-value">
                      {programOfStudy.first_choice || ""}
                    </td>
                  </tr>
                  <tr data-row="contact">
                    <td data-label="contact">Contact#:</td>
                    <td data-value="contact-value">
                      {personalInfo.phone_no || fatherInfo.mobile_number || ""}
                    </td>
                  </tr>
                  <tr data-row="address">
                    <td data-label="address">Address:</td>
                    <td data-value="address-value">
                      {personalInfo.permanent_address ||
                        personalInfo.postal_address ||
                        ""}
                    </td>
                  </tr>
                  <tr data-row="cnic">
                    <td data-label="cnic">CNIC No:</td>
                    <td data-value="cnic-value">{personalInfo.cnic || ""}</td>
                  </tr>
                </tbody>
              </table>

              {/* Fee Information Table */}
              <table
                className="table table-bordered mb-1"
                style={{ fontSize: "9px", marginBottom: "8px" }}
                data-table-type="fee-info"
              >
                <tbody>
                  <tr data-row="application-fee">
                    <td style={{ width: "70%" }} data-label="application-fee">
                      Application Processing Fee
                    </td>
                    <td
                      style={{ width: "30%" }}
                      data-value="application-fee-value"
                    >
                      {isAdmissionYearValid ? applicationFee : "N/A"}
                    </td>
                  </tr>
                  <tr data-row="late-fee">
                    <td data-label="late-fee">Late Fee</td>
                    <td data-value="late-fee-value">{lateFee}</td>
                  </tr>
                  <tr className="fw-bold" data-row="total-amount">
                    <td data-label="total-amount">Total Amount</td>
                    <td data-value="total-amount-value">
                      {isAdmissionYearValid ? totalAmount : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Amount in Words */}
              <div
                className="border border-top-0 p-1 small text-center"
                style={{ fontSize: "8px", marginBottom: "5px" }}
                data-section="amount-label"
              >
                Rupees (in words)
              </div>

              <div
                className="text-center small fw-bold p-1 border border-top-0"
                style={{ fontSize: "8px", minHeight: "30px" }}
                data-section="amount-words"
              >
                {isAdmissionYearValid
                  ? amountInWords
                  : "Fee not applicable for current admission year"}
              </div>

              {/* Signatures */}
              <div className="mt-2" style={{ fontSize: "8px" }}>
                <div className="d-flex justify-content-between">
                  <span>Depositor's Signature</span>
                  <span>Authorized Signature</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print Styles */}
      <style>
        {`
          @media print {
            .challan-pdf-container {
              margin: 0;
              padding: 5mm;
              box-shadow: none;
            }
            .challan-column {
              border: 1px solid #000 !important;
            }
          }
          
          .table td {
            padding: 2px 4px;
          }
        `}
      </style>
    </div>
  );
}
