import React, { useState } from "react";

const CnicInput = ({ id, readonly, value }) => {
  const [cnic, setCnic] = useState("");
  const [isCnicValid, setIsCnicValid] = useState(true);

  const handleCnicChange = (e) => {
    const formattedCnic = formatCnic(e.target.value);
    setCnic(formattedCnic);

    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    setIsCnicValid(cnicPattern.test(formattedCnic));
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

  return (
    <input
      type="text"
      id={id}
      value={cnic || value || ""}
      onChange={handleCnicChange}
      maxLength={15}
      style={{ border: !isCnicValid ? "2px solid red" : "" }}
      required
      autoComplete="off"
      readOnly={readonly}
    />
  );
};

export default CnicInput;
