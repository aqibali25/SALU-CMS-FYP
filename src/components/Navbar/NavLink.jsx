const NavLinks = ({ link }) => {
  return (
    <a href={`/${link.href}`} className={link.className}>
      {link.name}
    </a>
  );
};

export default NavLinks;
