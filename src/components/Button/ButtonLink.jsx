import { Link } from "react-router-dom";
import "../../styles/ButtonLink.css";

const ButtonLink = ({ text, className, href }) => {
  return (
    <Link to={`/${href}`} className={className}>
      {text}
    </Link>
  );
};

export default ButtonLink;
