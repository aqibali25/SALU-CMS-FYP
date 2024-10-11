import "../../styles/ButtonLink.css";

const ButtonLink = ({ text, className, href }) => {
  return (
    <a href={`/${href}`} className={className}>
      {text}
    </a>
  );
};

export default ButtonLink;
