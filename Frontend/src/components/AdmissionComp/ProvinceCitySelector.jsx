import React, { useState, useEffect } from "react";
import { citiesByProvince } from "../../contexts/provinceCitiesData";

const ProvinceCitySelector = ({
  initialProvince = "",
  initialCity = "",
  onProvinceChange,
  onCityChange,
}) => {
  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [cities, setCities] = useState([]);

  // Update cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      setCities(citiesByProvince[selectedProvince] || []);
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  // Update province and city when initial values change (after fetching data)
  useEffect(() => {
    setSelectedProvince(initialProvince);
    setSelectedCity(initialCity);
    setCities(citiesByProvince[initialProvince] || []);
  }, [initialProvince, initialCity]);

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedCity(""); // Reset city when province changes
    setCities(citiesByProvince[province] || []);
    onProvinceChange(province);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    onCityChange(city);
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
          <option value="" disabled>
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
          value={selectedCity}
          onChange={handleCityChange}
          required
        >
          <option value="" disabled>
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
