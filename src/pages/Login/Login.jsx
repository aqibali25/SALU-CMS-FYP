import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Login"; // Set document title
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      {/* Content for the Login page */}
    </div>
  );
};

export default Login;
