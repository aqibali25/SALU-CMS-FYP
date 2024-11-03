import DateOfBirth from "./DateOfBirth";
import FormContainer from "./FormContainer";

const PersonalInfo = () => {
  return (
    <FormContainer Heading={"Personal Information"}>
      <div className="formContainer">
        <div className="inputContainer">
          <label htmlFor="name">
            <span className="required">*</span>First Name:
          </label>
          <input type="text" required />
        </div>
        <div className="inputContainer">
          <label htmlFor="name">
            <span className="required">*</span>Last Name:
          </label>
          <input type="text" required />
        </div>
        <div className="inputContainer">
          <label htmlFor="name">
            <span className="required">*</span>Gender:
          </label>
          <select name="Gender" id="gender" className="col-6">
            <option value="">[Select an Option]</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="inputContainer">
          <label htmlFor="dob-month">
            <span className="required">* </span>Date of Birth:
          </label>
          <DateOfBirth></DateOfBirth>
        </div>
        <div className="inputContainer">
          <label htmlFor="name">
            <span className="required">*</span>Religion:
          </label>
          <input type="text" required />
        </div>
        <div className="inputContainer">
          <label htmlFor="name">Blood Group:</label>
          <input type="text" required />
        </div>
        <div className="inputContainer">
          <label htmlFor="name">
            <span className="required">*</span>Disability:
          </label>
          <select name="Gender" id="gender" className="col-6">
            <option value="">[Select an Option]</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="inputContainer">
          <label htmlFor="name">
            <span className="required">*</span>Native Language:
          </label>
          <input type="text" required />
        </div>
      </div>
    </FormContainer>
  );
};

export default PersonalInfo;
