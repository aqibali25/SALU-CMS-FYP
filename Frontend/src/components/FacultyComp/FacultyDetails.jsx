import BackButton from "../BackButton";

const FacultyDetails = ({ facultyMember, onBack }) => {
  return (
    <div className="formConitainer facultyMemDetails d-flex flex-column align-items-start justify-content-start gap-5 ">
      <BackButton onClick={onBack} />
      <div className="facultydetailsMain d-flex  gap-5">
        <div className="facultyMemImage d-flex">
          <img src={facultyMember.src} alt="Faculty Member" />
        </div>
        <div className="facultyDetails w-100">
          <div className="facultydetailsHeader">
            <h3 className="m-0">Mr. {facultyMember.name}</h3>
            <p style={{ fontSize: ".9rem" }}>{facultyMember.title}</p>
          </div>
          <hr />
          <div className="facultyContact overflow-hidden">
            <h5 className="m-0">Contact Information</h5>
            <p style={{ fontSize: ".8rem" }}>
              Email : {/*{facultyMember.email}*/}{" "}
              Badaruddin.Chachar@salu.edu.com
            </p>
          </div>
          <hr />
          <div className="facultyBio">
            <h5>Biography</h5>
            <p style={{ fontSize: ".9rem" }}>{facultyMember.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
