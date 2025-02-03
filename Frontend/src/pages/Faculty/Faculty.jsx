import React, { useEffect, useState } from "react";
import "./Faculty.css";
import SlidingGallery from "../../components/FacultyComp/SlidingGallery";

// Import images
import MrShahidAliMahar from "../../assets/FacultyImages/Mr.ShahidAliMahar.png";
import MrSadaquatAliRuk from "../../assets/FacultyImages/Mr.SadaquatAliRuk.png";
import MrNaseeruddinKamran from "../../assets/FacultyImages/Mr.NaseeruddinKamran.png";
import MrBadarUdDin from "../../assets/FacultyImages/Mr.BadarUdDin.png";
import MrImranSiddique from "../../assets/FacultyImages/Mr.ImranSiddique.jpg";

const Faculty = () => {
  const [activeFilter, setActiveFilter] = useState("Computer Science");
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const faculty = {
    CsFacultyFacultyData: [
      {
        id: 1,
        src: MrShahidAliMahar,
        name: "Dr. Shahid Ali Mahar",
        title: "HOD & Professor",
      },
      {
        id: 2,
        src: MrSadaquatAliRuk,
        name: "Sadaquat Ali Ruk",
        title: "Professor",
      },
      { id: 3, src: MrBadarUdDin, name: "Badar Ud Din", title: "Professor" },
      {
        id: 4,
        src: MrImranSiddique,
        name: "Imran Siddique",
        title: "Professor",
      },
      {
        id: 5,
        src: MrNaseeruddinKamran,
        name: "Naseeruddin Kamran",
        title: "Professor",
      },
    ],
    BusinessAdminFacultyData: [
      {
        id: 1,
        src: MrShahidAliMahar,
        name: "Dr. Imran Ahmed Shah",
        title: "HOD & Professor",
      },
      {
        id: 2,
        src: MrSadaquatAliRuk,
        name: "Fayyaz Bhutto",
        title: "Professor",
      },
      { id: 3, src: MrBadarUdDin, name: "Nawaz Selro", title: "Professor" },
      {
        id: 4,
        src: MrImranSiddique,
        name: "Allah Bux Lakhan",
        title: "Professor",
      },
    ],
    EnglishLanguageFacultyData: [
      {
        id: 1,
        src: MrShahidAliMahar,
        name: "Abbas Ali",
        title: "HOD & Professor",
      },
      {
        id: 2,
        src: MrSadaquatAliRuk,
        name: "Khuda Dino",
        title: "Professor",
      },
      { id: 3, src: MrBadarUdDin, name: "Irfan Ali Memon", title: "Professor" },
      {
        id: 4,
        src: MrImranSiddique,
        name: "Mushahid Ali Shah",
        title: "Professor",
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Set the document title to "Faculty"
    document.title = "Faculty | SALU Ghotki";
  }, []);

  return (
    <div className="formConitainer m-3 p-4 d-flex flex-column align-items-center justify-content-center gap-5">
      <h2 className="text-center">Meet Our Teachers</h2>

      {/* Filter Buttons */}
      <div className="filterFaculty d-flex justify-content-center align-content-center">
        {[
          "Computer Science",
          "Business Administration",
          "English Language & Literature",
        ].map((filter) => (
          <button
            key={filter}
            className={`filter ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Pass isLoading directly to SlidingGallery */}
      {activeFilter === "Computer Science" && (
        <SlidingGallery
          images={faculty.CsFacultyFacultyData}
          isloading={isLoading}
        />
      )}
      {activeFilter === "Business Administration" && (
        <SlidingGallery
          images={faculty.BusinessAdminFacultyData}
          isloading={isLoading}
        />
      )}
      {activeFilter === "English Language & Literature" && (
        <SlidingGallery
          images={faculty.EnglishLanguageFacultyData}
          isloading={isLoading}
        />
      )}
    </div>
  );
};

export default Faculty;
