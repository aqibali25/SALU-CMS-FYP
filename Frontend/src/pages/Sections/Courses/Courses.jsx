import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "../../../components/Courses/CourseCard";

// Images
import CSImage from "../../../assets/CSCourse.png";
import BBAImage from "../../../assets/BBACourse.png";
import EnglishImages from "../../../assets/EnglishCourse.png";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const courses = [
  {
    title: "BS(Computer Science)",
    image: CSImage,
  },
  {
    title: "BS(Business Administration)",
    image: BBAImage,
  },
  {
    title: "BS(English Languages & Literature)",
    image: EnglishImages,
  },
];

const Courses = () => {
  return (
    <Container className="mt-5 mb-5">
      <SectionTitle label={"Offered Degree Programs"}></SectionTitle>
      <Row className="mt-4">
        {courses.map((course, index) => (
          <Col key={index} md={4} className="mb-4">
            {" "}
            <CourseCard title={course.title} image={course.image} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Courses;
