import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ButtonLink.css";

const ButtonLink = ({ text, className, to }) => {
  return (
    <Link to={to} className={className}>
      {text}
    </Link>
  );
};

export default ButtonLink;
