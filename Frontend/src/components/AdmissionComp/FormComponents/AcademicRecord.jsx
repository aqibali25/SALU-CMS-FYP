import InputContainer from "../InputContainer";

const AcademicRecord = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => currentYear - i
  );

  return (
    <div className="formConitainer p-4">
      <h4>Degree Information (Intermediate)</h4>
      <form>
        <div className="formContainer">
          <InputContainer
            htmlFor="group"
            title="Group"
            required={true}
            inputType="text"
          />
          <div className="inputContainer">
            <label htmlFor="degreeYear">
              <span className="required">*</span>Degree Year:
            </label>
            <select
              name="degreeYear"
              id="degreeYear"
              className="col-6"
              defaultValue=""
            >
              <option value="" disabled>
                [Select an Option]
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <InputContainer
            htmlFor="seatNo"
            title="Seat No"
            required={true}
            inputType="text"
          />
          <InputContainer
            htmlFor="collegeName"
            title="College Name"
            required={true}
            inputType="text"
          />
          <InputContainer
            htmlFor="board"
            title="Board"
            required={true}
            inputType="text"
          />
          <InputContainer
            htmlFor="totalMarks"
            title="Total Marks"
            required={true}
            inputType="text"
          />
          <InputContainer
            htmlFor="marksObtained"
            title="Marks Obtained"
            required={true}
            inputType="text"
          />
          <InputContainer
            htmlFor="grade"
            title="Grade"
            required={true}
            inputType="text"
            readOnly={true}
            value={"A+"}
          />
          <InputContainer
            htmlFor="percentage"
            title="Percentage"
            required={true}
            inputType="text"
            readOnly={true}
            value={"90%"}
          />
        </div>
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled" type="submit">
            Save & Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicRecord;
