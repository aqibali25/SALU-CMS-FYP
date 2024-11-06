import React, { useEffect } from "react";

const Faculty = () => {
  useEffect(() => {
    // Set the document title to "Faculty"
    document.title = "Faculty | SALU Ghotki";
  }, []);

  return (
    <div>
      <h1>Faculty Page</h1>
      {/* Content for the Faculty page */}
    </div>
  );
};

export default Faculty;
