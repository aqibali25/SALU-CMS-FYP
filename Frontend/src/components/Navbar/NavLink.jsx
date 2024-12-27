import { Link } from "react-router-dom";

const NavLinks = ({ link }) => {
  return (
    <Link to={`/${link.href}`} className={link.className}>
      {link.name}
    </Link>
  );
};

export default NavLinks;
