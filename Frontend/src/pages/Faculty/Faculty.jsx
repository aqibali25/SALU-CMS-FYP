import React, { useEffect, useState } from "react";
import "./Faculty.css";
import SlidingGallery from "../../components/FacultyComp/SlidingGallery";

// Import images
import MrShahidAliMahar from "../../assets/FacultyImages/Mr.ShahidAliMahar.png";
import MrSadaquatAliRuk from "../../assets/FacultyImages/Mr.SadaquatAliRuk.png";
import MrNaseeruddinKamran from "../../assets/FacultyImages/Mr.NaseeruddinKamran.png";
import MrBadarUdDin from "../../assets/FacultyImages/Mr.BadarUdDin.png";
import MrImranSiddique from "../../assets/FacultyImages/Mr.ImranSiddique.jpg";
import FacultyDetails from "../../components/FacultyComp/FacultyDetails";

const Faculty = () => {
  const [activeFilter, setActiveFilter] = useState("Computer Science");
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [selectedFaculty, setSelectedFaculty] = useState(null); // Track selected faculty member

  const faculty = {
    CsFacultyFacultyData: [
      {
        id: 1,
        src: MrShahidAliMahar,
        name: "Dr. Shahid Ali Mahar",
        title: "HOD & Professor",
        bio: `Dr. Shahid Ali Mahar received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, Computer Science Department. Apart from that, he is also working as the Coordinator of MS and PhD program in Computer Science Department, Salu campus Ghotki. He has vast experience in teaching and research. His research findings are published in tier-I impact factor journals. These journals are categorized "W Category" by HEC. His area of research is machine learning, text classification, Data Science, Image Classification, Digital Image Processing, Natural Language Processing, Deep Learning, and online social networking.`,
      },
      {
        id: 2,
        src: MrSadaquatAliRuk,
        name: "Sadaquat Ali Ruk",
        title: "Professor",
        bio: `Sadaquat Ali Ruk received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, Computer Science Department. Apart from that, he is also working as the Coordinator of MS and PhD program in Computer Science Department, Salu campus Ghotki. He has vast experience in teaching and research. His research findings are published in tier-I impact factor journals. These journals are categorized "W Category" by HEC. His area of research is machine learning, text classification, Data Science, Image Classification, Digital Image Processing, Natural Language Processing, Deep Learning, and online social networking.`,
      },
      {
        id: 3,
        src: MrBadarUdDin,
        name: "Badar Ud Din",
        title: "Professor",
        bio: `Badaruddin Chachar received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, Computer Science Department. Apart from that, he is also working as the Coordinator of MS and PhD program in Computer Science Department, Salu campus Ghotki. He has vast experience in teaching and research. His research findings are published in tier-I impact factor journals. These journals are categorized "W Category" by HEC. His area of research is machine learning, text classification, Data Science, Image Classification, Digital Image Processing, Natural Language Processing, Deep Learning, and online social networking.`,
      },
      {
        id: 4,
        src: MrImranSiddique,
        name: "Imran Siddique",
        title: "Professor",
        bio: `Imran Siddiqui received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, Computer Science Department. Apart from that, he is also working as the Coordinator of MS and PhD program in Computer Science Department, Salu campus Ghotki. He has vast experience in teaching and research. His research findings are published in tier-I impact factor journals. These journals are categorized "W Category" by HEC. His area of research is machine learning, text classification, Data Science, Image Classification, Digital Image Processing, Natural Language Processing, Deep Learning, and online social networking.`,
      },
      {
        id: 5,
        src: MrNaseeruddinKamran,
        name: "Naseeruddin Kamran",
        title: "Professor",
        bio: `
        Naseeruddin Kamran received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, Computer Science Department. Apart from that, he is also working as the Coordinator of MS and PhD program in Computer Science Department, Salu campus Ghotki. He has vast experience in teaching and research. His research findings are published in tier-I impact factor journals. These journals are categorized "W Category" by HEC. His area of research is machine learning, text classification, Data Science, Image Classification, Digital Image Processing, Natural Language Processing, Deep Learning, and online social
        `,
      },
    ],
    BusinessAdminFacultyData: [
      {
        id: 1,
        src: MrShahidAliMahar,
        name: "Dr. Imran Ahmed Shah",
        title: "HOD & Professor",
        bio: `Dr. Imran Ahmed Shah received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor,
        Business Administration Department. Apart from that, he is also working as the Coordinator of MS and PhD program in Business Administration Department, Salu campus Ghotki. He has vast experience in teaching and research. His research findings are published in tier-I impact factor journals. These journals are categorized "W Category" by HEC.`,
      },
      {
        id: 2,
        src: MrSadaquatAliRuk,
        name: "Fayyaz Bhutto",
        title: "Professor",
        bio: `Fayyaz Bhutto received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Business Administration Professor.`,
      },
      {
        id: 3,
        src: MrBadarUdDin,
        name: "Nawaz Selro",
        title: "Professor",
        bio: `
        Nawaz Selro received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Business Administration Professor.`,
      },
      {
        id: 4,
        src: MrImranSiddique,
        name: "Allah Bux Lakhan",
        title: "Professor",
        bio: `Allah Bux Lakhan received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Business Administration Professor.`,
      },
    ],
    EnglishLanguageFacultyData: [
      {
        id: 1,
        src: MrShahidAliMahar,
        name: "Abbas Ali",
        title: "HOD & Professor",
        bio: `Abbas Ali received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, English Language Department.`,
      },
      {
        id: 2,
        src: MrSadaquatAliRuk,
        name: "Khuda Dino",
        title: "Professor",
        bio: `Khuda Dino received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, English Language Department.`,
      },
      {
        id: 3,
        src: MrBadarUdDin,
        name: "Irfan Ali Memon",
        title: "Professor",
        bio: `Irfan Ali Memon received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, English Language Department.`,
      },
      {
        id: 4,
        src: MrImranSiddique,
        name: "Mushahid Ali Shah",
        title: "Professor",
        bio: `Mushahid Ali Shah received his PhD in Machine Learning and Text Classification from University of Malaya, Kuala Lumpur, Malaysia. In addition, he completed his MS in Software Engineering from National University, FAST, Karachi, Pakistan and Bachelors from SZABIST Karachi. He is working at IBA University since 2020. Presently, he is working as Professor, English Language Department.`,
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
    <>
      {/* Show FacultyDetails if a faculty member is selected */}
      {selectedFaculty ? (
        <FacultyDetails
          facultyMember={selectedFaculty}
          onBack={() => setSelectedFaculty(null)} // Back button to return to the main screen
        />
      ) : (
        /* Show the main faculty section if no faculty member is selected */
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
              onSelect={(facultyMember) => setSelectedFaculty(facultyMember)} // Select faculty member
            />
          )}
          {activeFilter === "Business Administration" && (
            <SlidingGallery
              images={faculty.BusinessAdminFacultyData}
              isloading={isLoading}
              onSelect={(facultyMember) => setSelectedFaculty(facultyMember)} // Select faculty member
            />
          )}
          {activeFilter === "English Language & Literature" && (
            <SlidingGallery
              images={faculty.EnglishLanguageFacultyData}
              isloading={isLoading}
              onSelect={(facultyMember) => setSelectedFaculty(facultyMember)} // Select faculty member
            />
          )}
        </div>
      )}
    </>
  );
};

export default Faculty;
