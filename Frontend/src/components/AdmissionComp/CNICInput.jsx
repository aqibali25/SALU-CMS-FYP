import React, { useState } from "react";

const CnicInput = ({ id, readonly, value, onChange }) => {
  const [cnic, setCnic] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleCnicChange = (e) => {
    const inputValue = e.target.value;
    const formattedCnic = formatCnic(inputValue);

    // Update local state
    setCnic(formattedCnic);

    // Call the parent onChange function if provided
    if (onChange) {
      onChange({
        target: {
          id,
          value: formattedCnic,
        },
      });
    }
  };

  const formatCnic = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    const part1 = cleanValue.substring(0, 5);
    const part2 = cleanValue.substring(5, 12);
    const part3 = cleanValue.substring(12, 13);
    let formatted = part1;
    if (part2) formatted += "-" + part2;
    if (part3) formatted += "-" + part3;
    return formatted;
  };

  const handleBlur = () => {
    setHasBlurred(true);
  };

  const isValidCnic = (cnic) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);

  return (
    <input
      type="text"
      id={id}
      value={cnic || value || ""}
      onChange={handleCnicChange}
      onBlur={handleBlur}
      maxLength={15}
      style={{
        border:
          hasBlurred && cnic && !isValidCnic(cnic) // If blurred, text exists, and invalid
            ? "2px solid red"
            : "", // No border otherwise
      }}
      required
      autoComplete="off"
      readOnly={readonly}
    />
  );
};

export default CnicInput;
