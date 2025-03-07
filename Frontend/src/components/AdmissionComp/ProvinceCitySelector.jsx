import React, { useState, useEffect } from "react";
import { citiesByProvince } from "../../contexts/provinceCitiesData";

const ProvinceCitySelector = ({ onProvinceChange, onCityChange }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (selectedProvince) {
      setCities(citiesByProvince[selectedProvince]);
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    onProvinceChange(province);
  };

  return (
    <>
      <div className="inputContainer">
        <label htmlFor="province">
          <span className="required">*</span>Province:
        </label>
        <select
          name="province"
          id="province"
          className="col-6"
          value={selectedProvince}
          onChange={handleProvinceChange}
          required
        >
          <option value="" disabled selected>
            [Select an Option]
          </option>
          {Object.keys(citiesByProvince).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>
      <div className="inputContainer">
        <label htmlFor="city">
          <span className="required">*</span>City:
        </label>
        <select
          name="city"
          id="city"
          className="col-6"
          disabled={!selectedProvince}
          onChange={(e) => onCityChange(e.target.value)}
          required
        >
          <option value="" disabled selected>
            [Select an Option]
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ProvinceCitySelector;
