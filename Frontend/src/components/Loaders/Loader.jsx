import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="face first">
          <div className="circle" />
        </div>
        <div className="face second">
          <div className="circle" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Center the loader vertically on the screen */
  width: 100vw; /* Ensure the loader is centered horizontally */
  position: fixed;
  top: 0;
  left: 0;

  .loader {
    width: 8em; /* Increased size */
    height: 8em; /* Increased size */
    font-size: 9px; /* Adjusted font size */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader .face {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: animate023845 2.2s linear infinite;
  }

  .loader .face.first {
    width: 100%;
    height: 100%;
    color: #e5b300; /* Changed to E5B300 */
    border-color: currentColor transparent transparent currentColor;
    border-width: 0.4em 0.4em 0em 0em; /* Increased thickness */
    --deg: -45deg;
    animation-direction: normal;
  }

  .loader .face.second {
    width: 70%;
    height: 70%;
    color: #30345d; /* Changed to 30345D */
    border-color: currentColor currentColor transparent transparent;
    border-width: 0.5em 0em 0em 0.5em; /* Increased thickness */
    --deg: -130deg;
    animation-direction: reverse;
  }

  .loader .face .circle {
    position: absolute;
    width: 50%;
    height: 0.2em; /* Increased thickness */
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: rotate(var(--deg));
    transform-origin: left;
  }

  .loader .face .circle::before {
    position: absolute;
    top: -1.3em; /* Increased gap */
    right: -1.3em; /* Increased gap */
    content: "";
    width: 1.5em; /* Increased size */
    height: 1.5em; /* Increased size */
    background-color: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em,
      0 0 0 0.7em rgba(255, 255, 0, 0.1); /* Adjusted shadow */
  }

  @keyframes animate023845 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export default Loader;
