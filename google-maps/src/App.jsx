import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css'

function MapController({ center }) {
const map = useMap();
useEffect(() => {
  if (center) {
    map.setView(center, 13)
  }
}, [center, map])
return null;
}
export default function App() {
  const [cityName, setCityName] = useState('');
 const [error, setError] = useState('');
const [userCenter, setUserCenter] = useState([52.52, 13.40])
 useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((userPosition => {
     const { latitude, longitude } = userPosition.coords;
     setUserCenter([latitude, longitude]);
    }, (err) => {
      console.log("Geolocation error:", err.message);
    }))
  }
 }, [])
 async function handleSearch() {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`);
    if (!response.ok) {
      throw new Error("Mistake try again!")
    }
    const data = await response.json()
    if (data && data.length > 0) {
 setUserCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
setError('')
    } else {
      setError("City not found");
    }
  } catch (error) {
setError(error.message)
  }
}
function handleMyLocation() {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
     setUserCenter([latitude, longitude]);
     setError('');
},
     (err) => {
          setError("Could not get location", err);
        }
)
  }
}
  return (
    <div className='main'>
      <form className='submit' onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
             <p className="google-text"><span className="g-blue">G</span><span className="g-red">o</span><span className="g-yellow">o</span><span className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span><span className="g-green">-</span><span className="g-blue">M</span><span className="g-red">a</span><span className="g-yellow">p</span><span className="g-green">s</span></p>
             <div className='input-wrapper'>
        <input className='input2' type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Enter city..."/>
        <button onClick={() => setCityName('')} className='city-delete' type='button'>×</button>
        </div>
          {error && <p className='error'>{error}</p>}
    <button type="submit" className='input'>Search</button>
<button type="button" onClick={handleMyLocation} className='location'>Location</button> 
      </form>
    <MapContainer center={userCenter} zoom={13} className='container'>
     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
     <MapController center={userCenter} />
      <Circle center={userCenter} radius={100}/>
            </MapContainer>
      </div>
  )
}
