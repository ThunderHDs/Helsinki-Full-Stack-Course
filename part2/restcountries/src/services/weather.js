import axios from "axios"

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather' //base URL for free session of API
const api_key = import.meta.env.VITE_SOME_KEY;

const getWeather = (country) => { 
    console.log('fetching data... ');
    const latlng = country[0].latlng;
    const lat = latlng[0];
    const lon = latlng[1];
    const constructUrl = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const request = axios.get(constructUrl)
    return request.then(response=>response.data);
}


export default getWeather;