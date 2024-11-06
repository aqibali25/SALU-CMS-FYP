import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./MissionAndVision.css";

const MissionAndVision = () => {
  return (
    <section className="container">
      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <SectionTitle label={"Vision"}></SectionTitle>
          <p className="mt-3 visionDescription ">
            Our aim is to be a leading institution that inspires future leaders.
            As the only university in our city, we are dedicated to making a
            positive impact in our community and beyond.
          </p>
        </div>
        <div className="col-md-6 mb-4">
          <SectionTitle label={"Mission"}></SectionTitle>
          <p className="mt-3 p-3 missionDescription">
            Our university strives to help students grow and think critically in
            a supportive environment. We focus on innovation and personal
            development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
