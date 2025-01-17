import React, { useState, useEffect } from "react";
import "../../styles/DateOfBirth.css";

const DateOfBirth = ({ value, onChange }) => {
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
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    // Populate days (1-31)
    setDays(Array.from({ length: 31 }, (_, i) => i + 1));

    // Populate years (from 1900 to current year)
    const currentYear = new Date().getFullYear() - 15;
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

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    // Pass the formatted date (DD-MM-YYYY) to the parent component
    if (selectedMonth && selectedYear && day) {
      onChange(
        `${day.padStart(2, "0")}-${selectedMonth.padStart(
          2,
          "0"
        )}-${selectedYear}`
      );
    }
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    // Pass the formatted date when month is selected
    if (selectedDay && selectedYear && month) {
      onChange(
        `${selectedDay.padStart(2, "0")}-${month.padStart(
          2,
          "0"
        )}-${selectedYear}`
      );
    }
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    // Pass the formatted date when year is selected
    if (selectedDay && selectedMonth && year) {
      onChange(
        `${selectedDay.padStart(2, "0")}-${selectedMonth.padStart(
          2,
          "0"
        )}-${year}`
      );
    }
  };

  return (
    <div className="dateOfBirth">
      <select
        id="dob-month"
        value={selectedMonth}
        onChange={handleMonthChange}
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
      <select
        id="dob-day"
        value={selectedDay}
        onChange={handleDayChange}
        required
      >
        <option value="" disabled>
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
        onChange={handleYearChange}
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
