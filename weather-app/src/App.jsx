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



const fetchWeather = async (e) => {
  e.preventDefault();
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
return (
  <div className='app-container'>
 <h2 className='h'>Weather App</h2>
 <form onSubmit={fetchWeather} className='search-form'>
  <input className='inpur' type="text" placeholder='Type your Text'  value={city} onChange={(e) => setCity(e.target.value)}/>
  <button className='butto' type='submit'>
    Search
  </button>
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
  </div>
)
}
export default App