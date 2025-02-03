import React, { useEffect } from "react";
import "./Faculty.css";
import SlidingGallery from "../../components/FacultyComp/SlidingGallery";

// Import images
import MrShahidAliMahar from "../../assets/FacultyImages/Mr.ShahidAliMahar.png";
import MrSadaquatAliRuk from "../../assets/FacultyImages/Mr.SadaquatAliRuk.png";
import MrNaseeruddinKamran from "../../assets/FacultyImages/Mr.NaseeruddinKamran.png";
import MrBadarUdDin from "../../assets/FacultyImages/Mr.BadarUdDin.png";
import MrImranSiddique from "../../assets/FacultyImages/Mr.ImranSiddique.jpg";

const Faculty = () => {
  const CsFacultyImages = [
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
    { id: 4, src: MrImranSiddique, name: "Imran Siddique", title: "Professor" },
    {
      id: 5,
      src: MrNaseeruddinKamran,
      name: "Naseeruddin Kamran",
      title: "Professor",
    },
    // Add more images as needed
  ];
  useEffect(() => {
    // Set the document title to "Faculty"
    document.title = "Faculty | SALU Ghotki";
  }, []);

  return (
    <div className="formConitainer m-3 p-4 d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-center">Meet Our Teachers</h2>
      <SlidingGallery images={CsFacultyImages} />
    </div>
  );
};

export default Faculty;
