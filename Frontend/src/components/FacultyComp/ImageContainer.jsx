import { Card, Placeholder } from "react-bootstrap";

const ImageContainer = ({ image, visibleCount, isloading, onClick }) => {
  return isloading ? (
    <Card
      className="skeleton-card"
      style={{
        width: `${100 / 4}%`,
        minWidth: "350px ",
        minHeight: "400px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Placeholder animation="glow h-100">
        <Placeholder className="profile-skeleton h-100" xs={12} />
      </Placeholder>
      <Card.Body>
        <Placeholder animation="glow">
          <Placeholder xs={8} /> <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  ) : (
    <div
      className="image-container"
      style={{ flex: `0 0 ${97.5 / visibleCount}%`, cursor: "pointer" }}
      onClick={onClick} // Call onClick when clicked
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
