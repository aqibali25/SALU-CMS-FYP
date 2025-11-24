const AdmissionGuide = () => {
  return (
    <>
      <div className="formConitainer col-md-12 p-4">
        <h2 className="mb-1" style={{ color: "#e9c545" }}>
          Instructions
        </h2>
        <hr />

        <div className="pt-2">
          <p className="mb-0">
            The menu on the left-hand-side provides links to each part of the
            application. Here is a brief description of each option.
          </p>
          {/* Candidate Status */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Candidate Status</h5>
            <p className="mb-0">
              This section basically provides information about the overall
              status of the candidate starting from filling the Admission Form
              until the test is conducted and admission is confirmed or
              rejected.
            </p>
          </div>

          {/* Submit Application */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Submit Application</h5>
            <p className="mb-0">
              This is the actual form that you must complete and submit. There
              are about five sections in the application form which must be
              completed depending on the program requirements.
            </p>
          </div>

          {/* Checklist */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Checklist</h5>
            <p className="mb-0">
              Lists all documents that you must submit to the Admission Office
              before the deadline along with application processing fee details.
            </p>
          </div>

          {/* Instructions */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Instructions</h5>
            <p className="mb-0">
              Provides a quick getting-started guide for navigating the
              admission portal.
            </p>
          </div>

          {/* Admission Schedule */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Admission Schedule</h5>
            <p className="mb-0">
              Shows the complete admission schedule with all important dates.
            </p>
          </div>

          {/* Eligibility General */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Eligibility Criteria – General</h5>
            <p className="mb-0">
              Lists general eligibility criteria for all programs.
            </p>
          </div>

          {/* Eligibility Program Wise */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Eligibility Criteria – Program Wise</h5>
            <p className="mb-0">
              Shows eligibility for specific departments based on your past
              education.
            </p>
          </div>

          {/* Admission Procedure */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Admission Procedure</h5>
            <p className="mb-0">
              Provides information on how to apply for admission at the
              university.
            </p>
          </div>

          {/* Prospectus */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Prospectus</h5>
            <p className="mb-0">
              Allows you to view the prospectus of programs offered for the
              current year.
            </p>
          </div>

          {/* Sample Papers */}
          <div className="py-3 border-bottom">
            <h5 className="fw-bold">Sample Papers</h5>
            <p className="mb-0">
              Provides sample test papers of departments offered at the
              university.
            </p>
          </div>

          {/* Fee Structure */}
          <div className="py-3">
            <h5 className="fw-bold">Fee Structure</h5>
            <p className="mb-0">
              Shows fee structure for each department for the current year.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionGuide;
