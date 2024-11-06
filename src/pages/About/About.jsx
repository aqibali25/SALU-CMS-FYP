import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    // Set the document title to "About"
    document.title = "About | SALU Ghotki";
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      {/* Content for the About page */}
    </div>
  );
};

export default About;
