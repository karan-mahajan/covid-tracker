import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import Infobox from './components/Infobox';
import Mapshow from './components/Mapshow'
import { Card, CardContent } from '@material-ui/core'
import Table from './components/Table';
import { sortData, prettyPrintStat } from './components/utils';
import Linegraph from './components/Linegraph';
import 'leaflet/dist/leaflet.css'
/* Disease.sh */

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setCenter] = useState({ lat: 20, lng: 77 })
  const [mapZoom, setZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState()
  let [casesType, setCasesType] = useState("cases");

  //Getting Country Names
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);


  //Changing Country
  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
        if (countryCode !== 'worldwide') {
          setCenter([data.countryInfo.lat, data.countryInfo.long]);
          setZoom(4);
        }
        else {
          setZoom(2)
        }
      });
  };

  return (
    <div className="App">
      <div className='app__left'>
        <Header country={country} countries={countries} onCountryChange={onCountryChange} />
        <div className='app__stats'>
          <Infobox
            isRed
            active={casesType === 'cases'}
            onClick={e => setCasesType('cases')}
            title='Coronovirus Cases'
            total={prettyPrintStat(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)}
          />
          <Infobox
            active={casesType === 'recovered'}
            onClick={e => setCasesType('recovered')}
            title='Recovered'
            total={prettyPrintStat(countryInfo.recovered)}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
          />
          <Infobox
            isRed
            active={casesType === 'deaths'}
            onClick={e => setCasesType('deaths')}
            title='Deaths'
            total={prettyPrintStat(countryInfo.deaths)}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
          />
        </div>
        <Mapshow mapCountries={mapCountries} center={mapCenter} zoom={mapZoom} casesType={casesType} />
      </div>
      <Card className='app__right'>
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className='app__graphTitle'>Worldwide new {casesType}</h3>
            <Linegraph
              casesType={casesType}
              className='app__graph'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
