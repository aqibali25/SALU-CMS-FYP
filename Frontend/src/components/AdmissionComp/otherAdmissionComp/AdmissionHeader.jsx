import React, { useEffect, useState } from "react";
import axios from "axios";

const AdmissionHeader = () => {
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // if you’re using JWT
  //       const res = await axios.get("http://localhost:3306/api/login", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       console.log("✅ Login API Response:", res.data);

  //       // assuming API returns something like { name: "Aqib Ali Kalwar", email: "...", ... }
  //       setUserData(res.data);
  //     } catch (error) {
  //       console.error("❌ Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <div
      className="formConitainer d-flex flex-column justify-content-evenly align-items-start px-4 py-3"
      style={{ minHeight: "100px" }}
    >
      <label htmlFor="name" style={{ fontSize: "1.3rem", fontWeight: "500" }}>
        Welcome {userData?.name ? userData.name : "Loading..."}
      </label>

      {/* Current date in this format: Friday, 31 January 2025 */}
      <label htmlFor="date" style={{ fontSize: ".9rem" }}>
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
