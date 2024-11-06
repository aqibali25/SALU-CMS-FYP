import React, { useState, useEffect } from "react";
import "../../../styles/DateOfBirth.css";

const DateOfBirth = () => {
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    // Populate days (1-31)
    setDays(Array.from({ length: 31 }, (_, i) => i + 1));

    // Populate years (from 1900 to current year)
    const currentYear = new Date().getFullYear();
    setYears(
      Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)
    );
  }, []);

  useEffect(() => {
    // Update day options based on selected month and year
    if (selectedMonth && selectedYear) {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  }, [selectedMonth, selectedYear]);

  return (
    <div className="dateOfBirth">
      <select
        id="dob-month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        required
      >
        <option value="" disabled>
          [Month]
        </option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <select id="dob-day" required>
        <option value="" disabled selected>
          [Day]
        </option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select
        id="dob-year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        required
      >
        <option value="" disabled>
          [Year]
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateOfBirth;
