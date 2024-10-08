import React, { useEffect } from "react";

const Admission = () => {
  useEffect(() => {
    // Set the document title to "Admission"
    document.title = "Admission";
  }, []);

  return (
    <div>
      <h1>Admission Page</h1>
      {/* Content for the Admission page */}
    </div>
  );
};

export default Admission;
