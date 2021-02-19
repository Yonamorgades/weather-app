import {useState} from 'react';
import './App.css';

const api = {
  key: "7cf03780b18599bd0d6bf6e8d2d70c92",
  base: "api.openweathermap.org/data/2.5/"
}
const axios = require('axios');
function App() {

  const [query,
    setQuery] = useState('');
  const [weather,
    setWeather] = useState({});

  const search = async evt => {
    if (evt.key === "Enter") {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api.key}`);
        setWeather(response.data)
      } catch (error) {
        console.error(error);
      }
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div
      className={(typeof weather.main != 'undefined')
      ? ((weather.main.temp > 16)
        ? 'app warm'
        : 'app')
      : 'app'}>
      <main >

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            onKeyPress={search}
            onChange=
            {e => setQuery(e.target.value)}
            value={query}
            placeholder="Search..."></input>
        </div>
        {typeof(weather.main) !== 'undefined' && <div>
          <div className="location-box">
            <div className="location">
              {`${weather.name}, ${weather.sys.country}`}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>}
      </main>
    </div>
  );
}

export default App;
