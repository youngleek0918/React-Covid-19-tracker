import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  // https://disease.sh/v3/covid-19/countries

  // useState = how to write a variable in REACT 
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  // useEffect = runs a piece of code based on a given condition
  useEffect(() => {
    //the code inside here will run once when the component loads and not again
    // async -> send a request, wait for it, do something with info

    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United State
            value: country.countryInfo.iso2, // US
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, [countries]);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    // console.log('---->', countryCode)

    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            {/* Loop through all the countries and show a drop down list of the options  */}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            {/* <MenuItem value="worldwide">WORLDWIDE</MenuItem> */}
            {/* <MenuItem value="usa">USA</MenuItem> */}
            {/* <MenuItem value="korea">KOREA</MenuItem> */}

          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}


    </div>
  );
}

export default App;
