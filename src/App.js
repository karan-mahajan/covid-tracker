import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import Infobox from './components/Infobox';
/* Disease.sh */

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  useEffect(() => {
    const getCountriesData = async () => {
      const result = await fetch('https://disease.sh/v3/covid-19/countries')
      const data = await result.json();
      const countriesData = data.map((country) => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ))
      setCountries(countriesData)
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)
  }

  return (
    <div className="App">
      <Header country={country} countries={countries} onCountryChange={onCountryChange} />
      <Infobox />
    </div>
  );
}

export default App;
