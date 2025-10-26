const Countries = ({countries}) => { 
    console.log('Countries received:', countries);


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
                        </li>
                    );
                })}
            </div>
            )
        }
    }
    
};

export default Countries;