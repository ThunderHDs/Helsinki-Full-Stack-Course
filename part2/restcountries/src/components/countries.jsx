import {useState, useEffect} from 'react'
import getWeather from '../services/weather';

const Countries = ({countries, setCountry}) => { 
    const [weather, setWeather] = useState(''); //Using states for store the weather data

    const handleChangeInfo = (country) => { // Handling specific views for some contries
        setCountry(country)
        console.log('Country selected ', country);
    }

    useEffect(()=>{ //Effect hook for obtaining the weather data
        if(countries.length === 1) {
            console.log('Fetching weather for:', countries[0].name.common);
            
            getWeather(countries) //getWeather returns a prommise that we handle here
                .then(weatherData => {
                    console.log('Weather data received:', weatherData);
                    setWeather(weatherData);
                })
                .catch(error=> {
                    console.error('Error fetching weather:', error);
                    setWeather(null);
                })
        }else {
            setWeather(null);
        }
    }, [countries]);

    if(countries.length > 10) { //validating if there's to many matches
        return(
            <div>to many matches, specify another filter</div>
        )
    }else {
        if(countries.length === 1) {// if we have only one country, then we show all information
            console.log('selected contry', countries);
            return (
                <div>
                    {countries.map(country => {
                        const languagesList = country.languages ? Object.values(country.languages) : [];
                return (
                        <li key={country.name.common}>
                            <h1>{country.name.common}</h1>
                            <p>Capital: {country.capital?.[0]}</p>
                            <p>Area: {country.area?.toLocaleString()}</p>
                            <h2>Languages</h2>
                            <ul>
                                {languagesList.map(language => (
                                        <li key={language}>{language}</li>
                                ))}
                            </ul>
                            <br/>
                            {country.flags && (
                                <img 
                                    src={country.flags.png} 
                                    alt={`Flag of ${country.name.common}`}
                                    width="100"
                                />
                            )}
                            <h2>Weather in {country.capital?.[0]}</h2>
                            {weather ? (
                                <div>
                                    <p>Temperature: {weather.main.temp}°C</p>
                                    <img 
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        width="100"
                                        />
                                    <p>Feels like: {weather.main.feels_like}°C</p>
                                    <p>Description: {weather.weather[0].description}</p>
                                    <p>Wind: {weather.wind.speed} m/s</p>
                                </div>
                            ) : (
                                <p>Loading weather data...</p>
                            )}
                        </li>
                        );
                    })}
                </div>
            )
        }else{
            return (
            <div>
                {countries.map(country => {
                    return (
                        <li key={country.name.common}>
                            {country.name.common}
                            <button onClick={()=> handleChangeInfo(country.name.common)}>Show</button> {/* Button for showing the single view of that country*/}
                        </li>
                    );
                })}
            </div>
            )
        }
    }
    
};

export default Countries;