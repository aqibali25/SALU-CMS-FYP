import React from "react";

const AdmissionProcedure = () => {
  return (
    <div className="formConitainer col-md-12 p-4">
      <h2 className="mb-1" style={{ color: "#e9c545" }}>
        Procedure to Apply for Admission
      </h2>
      <hr />

      <div className="pt-2">
        <p className="mb-3">
          Application for admission for Undergraduate Program shall be submitted
          online by the eligible candidate, on{" "}
          <a
            href="https://www.salu.edu.pk"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:5173/admission.salu-gc/admissions/form
          </a>
          . After completing the online form, candidates have to send the
          printed version of the form along with required documents, photos, and
          original challan of Rs. 2,200/-.
        </p>

        <p className="mb-3">
          In case of foreign candidates, the recommendation and undertaking on
          the prescribed proforma for the admission and the guarantee for the
          payment of fees and good behavior should come from the concerned
          Embassy/High Commission/Consulate General.
        </p>

        <p className="mb-0">
          Every student is required to submit an undertaking on non-judicial
          stamp paper of Rs.50/= duly attested by a Deputy District Officer
          (Revenue) along with the admission form.
        </p>
      </div>
    </div>
  );
};

export default AdmissionProcedure;
