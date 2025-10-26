import {useState} from 'react'

const Countries = ({countries, setCountry}) => { 

    const handleChangeInfo = (country) => { // Handling specific views for some contries
        setCountry(country)
        console.log('Country selected ', country);
    }

    if(countries.length > 10) { //validating if there's to many matches
        return(
            <div>to many matches, specify another filter</div>
        )
    }else {
        if(countries.length === 1) { // if we have only one country, then we show all information
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