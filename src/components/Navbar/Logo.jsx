import logo from "../../assets/Logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Salu logo" />
      <a href="/" className="name">
        <label htmlFor="name">SHAH ABDUL LATIF UNIVERSITY</label>
        <label>GHOTKI CAMPUS</label>
      </a>
    </div>
  );
};

export default Logo;
