import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Set the document title to "Home"
    document.title = "Home";
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {/* Content for the Home page */}
    </div>
  );
};

export default Home;
