import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox'
import Map from './Map'
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from './LineGraph';

function App() {
  // https://disease.sh/v3/covid-19/countries

  // useState = how to write a variable in REACT 
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // useEffect = runs a piece of code based on a given condition
  useEffect(() => {
    //the code inside here will run once when the component loads and not again
    // async -> send a request, wait for it, do something with info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United State
            value: country.countryInfo.iso2, // US
          }));

          const sortedData = sortData(data)
          setTableData(sortedData);
          setCountries(countries);
        });
    }

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log('---->', countryCode)
    // setCountry(countryCode)

    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
      });

  }
  console.log('countryinfo--->', countryInfo)

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          {/* Only one input can be used within a FormControl. */}
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* Loop through all the countries and show a drop down list of the options  */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* <MenuItem value="worldwide">WORLDWIDE</MenuItem> */}
              {/* <MenuItem value="usa">USA</MenuItem> */}
              {/* <MenuItem value="korea">KOREA</MenuItem> */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Title + Select input dropdown field */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />

      </div>

      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
