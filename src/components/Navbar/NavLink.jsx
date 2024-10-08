import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const NavLinks = ({ link }) => {
  return (
    <Link to={link.href} className={link.className}>
      {link.name}
    </Link>
  );
};

export default NavLinks;
