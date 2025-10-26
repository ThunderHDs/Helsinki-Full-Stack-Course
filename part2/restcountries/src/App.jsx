import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/countries'

function App() {
  const [countries, setCountries] = useState([]); //States for countries and country entry from user
  const [country, setCountry] = useState('');

  useEffect(()=> {
    console.log('fetching countries...');
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`) //fetching all countries for filtering later
      .then(response=>{
        const data = response.data;
        console.log('data response', data);
        setCountries(data)
        console.log(countries);
      })
      .catch(error => {
        console.log('Error fetching country:', error);
        setCountries([]); 
      });
  },[])

  const filteredCountries = countries.filter(countryData => //function to filter countries based on the entry from user
    countryData.name.common.toLowerCase().includes(country.toLowerCase())
  );

  //Handlers
  const findCountry = (event) => {
    setCountry(event.target.value);
  }

  return (
    <>
      <div>
        <label>find countries</label>
        <input value={country} onChange={findCountry}/>
      </div>
      <ul>
        <Countries countries={filteredCountries} /> 
      </ul>
    </>
  )
}

export default App
