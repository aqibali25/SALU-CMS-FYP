import React from "react";
import { Card } from "react-bootstrap";
import "./CourseCard.css"; // Import the CSS file

const CourseCard = ({ image, title, guideLink }) => {
  return (
    <Card className="custom-card shadow-sm mb-4">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title className="cardTitle">{title}</Card.Title>
        <Card.Text>
          <a href={guideLink} className="course-link">
            SEE COURSE GUIDE &rarr;
          </a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
