import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Salu logo" />
      <Link to="SALU-CMS-FYP/" className="name">
        <label htmlFor="name">SHAH ABDUL LATIF UNIVERSITY</label>
        <label>GHOTKI CAMPUS</label>
      </Link>
    </div>
  );
};

export default Logo;
