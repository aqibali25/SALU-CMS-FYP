import React from "react";
import { Card } from "react-bootstrap";
import "./CourseCard.css"; // Import the CSS file
import { Link } from "react-router-dom";

const CourseCard = ({ image, title }) => {
  return (
    <Card className="custom-card shadow-sm mb-4">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title className="cardTitle">{title}</Card.Title>
        <Card.Text>
          <Link to={"/SALU-CMS-FYP/admissions"} className="course-link">
            SEE COURSE GUIDE &rarr;
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
