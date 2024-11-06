import DateOfBirth from "./DateOfBirth";
import CnicInput from "./CNICInput.jsx";

const PersonalInfo = () => {
  return (
    <div className="formConitainer p-4">
      <h4>Personal Information</h4>
      <form>
        <div className="formContainer">
          <div className="inputContainer">
            <label htmlFor="firstName">
              <span className="required">*</span>First Name:
            </label>
            <input type="text" id="firstName" required />
          </div>
          <div className="inputContainer">
            <label htmlFor="lastName">
              <span className="required">*</span>Last Name:
            </label>
            <input type="text" id="lastName" required />
          </div>
          <div className="inputContainer">
            <label htmlFor="gender">
              <span className="required">*</span>Gender:
            </label>
            <select name="Gender" id="gender" className="col-6">
              <option value="" disabled selected>
                [Select an Option]
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="dob-month">
              <span className="required">* </span>Date of Birth:
            </label>
            <DateOfBirth />
          </div>
          <div className="inputContainer">
            <label htmlFor="cnic">
              <span className="required">*</span>CNIC:
            </label>
            <CnicInput
              label="CNIC"
              id="cnic"
              value="45102-2473066-7"
              readonly={"ture"}
              required
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="religion">
              <span className="required">*</span>Religion:
            </label>
            <input type="text" id="religion" required />
          </div>
          <div className="inputContainer">
            <label htmlFor="disability">
              <span className="required">*</span>Disability:
            </label>
            <select name="Disability" id="disability" className="col-6">
              <option value="" disabled selected>
                [Select an Option]
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="nativeLanguage">
              <span className="required">*</span>Native Language:
            </label>
            <input type="text" id="nativeLanguage" required />
          </div>{" "}
          <div className="inputContainer">
            <label htmlFor="bloodGroup">Blood Group:</label>
            <input type="text" id="bloodGroup" />
          </div>
        </div>
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled">Save & Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
