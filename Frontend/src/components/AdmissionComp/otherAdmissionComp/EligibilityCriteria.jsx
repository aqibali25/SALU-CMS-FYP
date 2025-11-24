import React from "react";

const EligibilityCriteria = () => {
  return (
    <div className="formConitainer col-md-12 p-4">
      <h2 className="mb-1" style={{ color: "#e9c545" }}>
        General Eligibility Criteria for Admission
      </h2>
      <hr />

      <div className="pt-2">
        <ul className="ms-3">
          <li>
            Every candidate desirous of taking admission to the Bachelor program
            shall fill in the online admission form available at the official
            website of Shah Abdul Latif University, Khairpur (
            <a
              href="https://www.salu.edu.pk"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.salu.edu.pk
            </a>
            ). The interested candidates are directed to upload all necessary
            documents along with challan of Rs. 2,200/- deposited at designated
            HBL branches as admission form processing fee.
          </li>
          <li>
            Candidates shall send the printed version of the application form
            along with copies of documents and original challan to the office of
            the Director Admissions.
          </li>
          <li>
            Every candidate must write his/her own NIC number as available on
            CNIC or Form-B.
          </li>
          <li>
            Every candidate shall supply three copies of recent photographs (two
            passport size and one 1’x1.5”), duly attested, along with the
            admission form.
          </li>
          <li>
            Candidates from Sindh (Intermediate 2019–2022) can apply for
            admission. Candidates from other provinces can apply for reserved
            seats only.
          </li>
          <li>
            Candidates educated outside Sukkur & Larkana Division Board need
            eligibility from SALU:
            <ul className="ms-3">
              <li>
                Domicile other than Sindh & education outside Sindh Board: Rs.
                18,500/-
              </li>
              <li>
                Domicile of Sindh & education outside Sindh Board: Rs. 9,500/-
              </li>
              <li>
                Domicile of Sindh & education outside Sukkur & Larkana Division
                Board: Rs. 3,850/-
              </li>
            </ul>
          </li>
          <li>
            Candidates who already completed a Bachelor's pass degree are not
            eligible for BS courses.
          </li>
          <li>
            Candidates with a 2-year Bachelor/ADE from 2017 onwards with minimum
            50% marks may seek admission in BS Part-III.
          </li>
          <li>
            Candidates who completed regular BS/M.A/M.Com/MPA/MBA or other
            16-year programs are not eligible for 16-year programs.
          </li>
          <li>
            H.S.C Part-II or equivalent (2017–2022) candidates may seek
            admission to 4-year Graduate Programs with minimum 50% marks
            (Arts/Commerce).
          </li>
          <li>
            Department-specific eligibility:
            <ul className="ms-3">
              <li>Pharmacy: minimum 60% marks (Biology group)</li>
              <li>Law: mandatory LAT score ≥50%</li>
            </ul>
          </li>
          <li>
            H.S.C Part-II Commerce candidates are eligible for BS programs
            except Natural & Physical Sciences.
          </li>
          <li>
            Candidates from other universities or boards must obtain an
            eligibility certificate from SALU. Provisional admission may be
            granted by the Registrar.
          </li>
          <li>
            Candidates must be Pakistani nationals. Foreigners require
            nomination/recommendation from relevant ministries.
          </li>
          <li>
            All admissions are provisional until approved by the Vice
            Chancellor, who may refuse admission without reason.
          </li>
          <li>
            Additional rules include:
            <ul className="ms-3">
              <li>No external exams during university enrollment</li>
              <li>No change of department after admission</li>
              <li>Maintain 75% attendance for eligibility</li>
              <li>University conduct rules must be followed</li>
              <li>Hostel rules and transport facilities explained</li>
              <li>Duplicate identity card fee: Rs. 300/-</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EligibilityCriteria;
