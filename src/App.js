import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import Infobox from './components/Infobox';
import Map from './components/Map'
import { Card, CardContent } from '@material-ui/core'
import Table from './components/Table';
import { sortData } from './components/utils';
import Linegraph from './components/Linegraph';
/* Disease.sh */

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  //Getting Country Names
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data)
          setCountries(countries);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])


  //Changing Country
  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
      });
  };

  return (
    <div className="App">
      <div className='app__left'>
        <Header country={country} countries={countries} onCountryChange={onCountryChange} />
        <div className='app__stats'>
          <Infobox title='Coronovirus Cases' total={countryInfo.cases} cases={countryInfo.today} />
          <Infobox title='Recovered' total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <Infobox title='Deaths' total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new Cases</h3>
          <Linegraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
