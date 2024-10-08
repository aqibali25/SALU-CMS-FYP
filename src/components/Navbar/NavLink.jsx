const NavLink = ({ link }) => {
  return (
    <a href={link.href} className={link.className}>
      {link.name}
    </a>
  );
};

export default NavLink;
