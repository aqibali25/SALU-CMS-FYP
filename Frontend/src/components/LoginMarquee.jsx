const LoginMarquee = () => {
  return (
    <marquee
      behavior="scroll"
      scrollamount="15"
      scrolldelay="0"
      direction="left"
      className="text-white position-absolute top-0 p-3 z-3 w-100"
      style={{ backgroundColor: "#e5b300d5" }}
    >
      2nd Merit list of Undergraduate Admissions, Part-I, 2025 (Main Campus)
      Note: All the selected candidates are advised to download the admission
      offer letter from the student's portal/website of SALU and bring all
      original relevant documents may be verified from the concerned
      Department/Institute along with Affidavit. After verification of documents
      download fees challan from the Portal/Website and pay via HBL Connect, HBL
      Mobile App and submit your documents along with the paid challan in the
      Departments/Institutes. The due date to pay the fees is 05-12-2024 to
      13-12-2024.
    </marquee>
  );
};

export default LoginMarquee;
