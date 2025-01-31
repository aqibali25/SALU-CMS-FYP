const AdmissionHeader = () => {
  return (
    <div
      className="formConitainer d-flex flex-column justify-content-evenly align-items-start px-4 py-3"
      style={{ minHeight: "100px" }}
    >
      <label htmlFor="name" style={{ fontSize: "1.3rem", fontWeight: "500" }}>
        Welcome Aqib Ali Kalwar
      </label>
      {/* current day  date month year here like this Friday, 31 January 2025 */}
      <label htmlFor="name" style={{ fontSize: ".9rem" }}>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </label>
    </div>
  );
};

export default AdmissionHeader;
