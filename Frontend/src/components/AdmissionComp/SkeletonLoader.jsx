import React from "react";

const SkeletonLoader = ({ length = 3 }) => {
  const containerStyle = {
    marginBottom: "1.5rem",
  };

  const placeholderStyle = {
    height: "1.5rem",
    background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
    backgroundSize: "200% 100%",
    animation: "loading 3.5s infinite ease-in-out", // Slower animation
    borderRadius: "0.25rem",
  };

  const keyframesStyle = `
  @keyframes loading {
    0% {
      background-position: 200% 0;
      opacity: 0.8;
    }
    50% {
      background-position: 100% 0;
      opacity: 1;
    }
    100% {
      background-position: -200% 0;
      opacity: 0.8;
    }
  }
`;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="animate mt-5">
        {Array.from({ length: length }).map((_, index) => (
          <div style={containerStyle} key={index}>
            <div
              style={{
                ...placeholderStyle,
                width: "30%",
                marginBottom: "0.8rem",
                height: "1rem",
              }}
            ></div>
            <div
              style={{
                ...placeholderStyle,
                width: "70%",
                height: "2rem", // Height for input placeholders
              }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonLoader;
