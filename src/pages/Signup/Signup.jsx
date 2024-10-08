import React, { useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    document.title = "Sign Up"; // Set document title
  }, []);

  return (
    <div>
      <h1>Sign Up Page</h1>
      {/* Content for the Sign Up page */}
    </div>
  );
};

export default Signup;
