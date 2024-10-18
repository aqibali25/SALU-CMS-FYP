import "../../styles/SectionTitle.css";

const SectionTitle = ({ label }) => {
  return (
    <div className="titleContainer">
      <label for="title" className="title">
        {label}
      </label>
      <span className="titleline"></span>
    </div>
  );
};

export default SectionTitle;
