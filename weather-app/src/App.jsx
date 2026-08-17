import { useState } from 'react'
import './App.css'
// константы с погодой, городом, ошибка
// константа с API_KEY .env
// написать fetch погоды

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [forecast, setForeCast] = useState(null)
const fetchWeather = async () => {
  setError('')
  setWeather(null)
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if (!response.ok) {
      throw new Error('Mistake try again!')
    } 
    const data = await response.json()
    setWeather(data);
  } catch (err) {
  setError(err.message)
  }
  }
const fetchWeatherByLocation = () => {
 if (!navigator.geolocation) {
  setError('Try geolocation again!')
  return;
 }
 setError('')
 setWeather(null)
 setForeCast(null)
 navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords
  try {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
  if (!response.ok) {
throw new Error('Mistake try again!')
  }
  const data = await response.json()
setWeather(data)
setCity(data.name)

const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${API_KEY}&units=metric`);
if (forecastResponse.ok) {
  const forecastData = await forecastResponse.json()
  setForeCast(forecastData);
}
  } catch (err) {
     setError(err.message)
     setForeCast(null)
  }
}
 );
}

 const getWeatherForecast = async () => {
setError('');
setWeather(null);
setForeCast(null)
try {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
  if (!response.ok) {
    throw new Error("Mistake try again!")
  }
  const data = await response.json()
  setForeCast(data)
} catch (err) {
  setError(err.message)
  setForeCast(null)
}
 }
 const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
    getWeatherForecast();
  };
return (
  <div className='app-container'>
 <h2 className='h'>Weather App</h2>
 <form onSubmit={handleSearch} className='search-form'>
  <div className='input-wrapper'>
  <input className='inpur' type="text" placeholder='Search'  value={city} onChange={(e) => setCity(e.target.value)}/>
  <button onClick={() => setCity('')} className='experiment' type='button'>×</button>
  </div>
  <button className='butto' type='submit'>
    Search
  </button>
  <button className='geolocation' onClick={fetchWeatherByLocation} type='button'>Weather by Geolocation 📍</button>
   </form>
  {error && <p className='error-message'>{error}</p>}
  {weather && (
    <div className='weather-block'>
    <h3>{weather.name}, {weather.sys.country}</h3>
    <div className='temp'>{Math.round(weather.main.temp)}</div>
    <div className='description'>{weather.weather[0].description}</div>
    <div className='details'>
      <p>humidity: {weather.main.humidity}%</p>
      <p>wind: {weather.wind.speed} m/c</p>
    </div>
    </div>
  )}
    {forecast && (
    <div className='forecast-container'>
      {forecast.list.map((item, index) => (
        <div key={index} className='forecast-card'>
          <p>{item.dt_txt}</p>
          <p>{Math.round(item.main.temp)}°C</p>
        </div>
      ))}
    </div>
    )}
  </div>
)
}
export default App