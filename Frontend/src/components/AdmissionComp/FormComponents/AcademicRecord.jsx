import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader"; // Import SkeletonLoader
import InputContainer from "../InputContainer";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";

const AcademicRecord = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => currentYear - i
  );

  const [formData, setFormData] = useState({
    group: "",
    degreeYear: "",
    seatNo: "",
    collegeName: "",
    board: "",
    totalMarks: "",
    marksObtained: "",
    grade: "A+",
    percentage: "90%",
  });

  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus(); // Use the context to update the form status
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // Simulate 800ms loading
    return () => clearTimeout(timer);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the form data
    console.log("Form Data Submitted:", formData);

    updateFormStatus("academicRecord", "Completed");
    navigate("/SALU-CMS-FYP/admission-form");
  };

  return (
    <div className="formConitainer p-4">
      <h4>Degree Information (Intermediate)</h4>

      <form onSubmit={handleSubmit}>
        {loading ? (
          <SkeletonLoader length={9} /> // 9 input fields
        ) : (
          <div className="formContainer">
            <InputContainer
              htmlFor="group"
              title="Group"
              required={true}
              inputType="text"
              value={formData.group}
              onChange={handleChange}
            />
            <div className="inputContainer">
              <label htmlFor="degreeYear">
                <span className="required">*</span>Degree Year:
              </label>
              <select
                id="degreeYear"
                className="col-6"
                value={formData.degreeYear}
                onChange={handleChange}
                required
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
              value={formData.seatNo}
              onChange={handleChange}
            />
            <InputContainer
              htmlFor="collegeName"
              title="College Name"
              required={true}
              inputType="text"
              value={formData.collegeName}
              onChange={handleChange}
            />
            <InputContainer
              htmlFor="board"
              title="Board"
              required={true}
              inputType="text"
              value={formData.board}
              onChange={handleChange}
            />
            <InputContainer
              htmlFor="totalMarks"
              title="Total Marks"
              required={true}
              inputType="text"
              value={formData.totalMarks}
              onChange={handleChange}
            />
            <InputContainer
              htmlFor="marksObtained"
              title="Marks Obtained"
              required={true}
              inputType="text"
              value={formData.marksObtained}
              onChange={handleChange}
            />
            <InputContainer
              htmlFor="grade"
              title="Grade"
              required={true}
              inputType="text"
              readOnly={true}
              value={formData.grade}
            />
            <InputContainer
              htmlFor="percentage"
              title="Percentage"
              required={true}
              inputType="text"
              readOnly={true}
              value={formData.percentage}
            />
          </div>
        )}
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
