import "../../styles/ImageContainer.css";

const ImageContainer = ({ image, visibleCount }) => {
  return (
    <div
      className="image-container"
      style={{ flex: `0 0 ${97.5 / visibleCount}%`, cursor: "pointer" }}
    >
      <div className="faculty-card">
        <div className="image-container-inner">
          <img src={image.src} alt="Profile photo" className="profile-image" />
          <div className="gradient-overlay"></div>
          <div className="text-overlay">
            <h2 className="text-center">Mr. {image.name}</h2>
            <p className="text-center">{image.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
