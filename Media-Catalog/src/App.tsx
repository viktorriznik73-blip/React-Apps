import { useState, useEffect } from 'react'
import './App.css'
interface Anime {
  id: number
  name: string,
  image?: string,
  genre: string,
  status: 'reading' | 'planned' | 'completed'
  url?: string
}
export default function SearchMedia() {
  const [titles, setTitles] = useState<Anime[]>(() => {
    const saved = localStorage.getItem('my_manga_list')
    if (saved) {
      try {
      JSON.parse(saved)
    } catch (e) {
      return []
    }
  }
    return [
        {
          id: 1,
          name:'Quintessential-Quintuplets',
          genre: 'Comedy',
          status: 'reading',
          image: 'https://static.yani.tv/posters/huge/1636926847.avif',
          url: 'https://myanimelist.net/manga/103851/Gotoubun_no_Hanayome'
        },
        {
          id: 2,
          name: 'Kaoru_Hana_wa_Rin_to_Saku',
          genre: 'Romantic comedy',
          status: 'planned',
          image: 'https://shikimori.io/uploads/poster/animes/59845/main_2x-a4fda62f6583f18bad6c6b5b6044904a.webp',
url: 'https://myanimelist.net/manga/144267/Kaoru_Hana_wa_Rin_to_Saku'
        }
    ]
  })
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
 const [filter, setFilter] = useState<'all' | 'reading' | 'planned' | 'completed'>('all')

 useEffect(() => {
  localStorage.setItem('my_manga_list', JSON.stringify(titles))
 }, [titles])
const handleChange = (e: any) => {
  setSearchQuery(e.target.value)
}
 const fetchMedia = async (type: string) => {
   setIsLoading(true)
   setError(null)
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 5000)
      try {
        const response = await fetch(`https://api.jikan.moe/v4/${type}?q=${searchQuery}`, {
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error('Mistake from the server');
        }

        const data = await response.json();
        const mappedTitles = data.data.map((item: any) => {
      return {
        id: item.mal_id,
        name: item.title,
        genre: '',
        status: 'planned' as const,
        image: item.images?.jpg?.image_url,
        url: item.url
      };
    });
    setTitles(mappedTitles);
      } catch (err: any) {
      console.warn('API недоступен, переключаемся на моковые данные:', err.message)
  
      setError('Attention: Server is not available, local data is shown.')
    } finally {
      clearTimeout(timeoutId)
      setIsLoading(false)
    }
};
const handleStatusChange = (id: number, newStatus: 'reading' | 'planned' | 'completed') => {
const updatedTitles = titles.map(item => {
  if (item.id === id) {
    return {...item, status: newStatus}
  }
  return item;
})
setTitles(updatedTitles)
}
    const filteredTitles = titles.filter(item => {
      if (filter === 'all') return true
      return item.status === filter
    })
 return (
    <div className='app-container' style={{ padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>Manga Tracker</h1>
      
      <div className="search-box" style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleChange} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchMedia('manga')
            }
          }} 
          placeholder='Search manga...'
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
      </div>


      <div className="filter-tabs" style={{display: 'flex', gap: '8px' }}>
        <button  onClick={() => setFilter('all')} style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}>All</button>
        <button  onClick={() => setFilter('reading')} style={{ fontWeight: filter === 'reading' ? 'bold' : 'normal' }}>Reading</button>
        <button  onClick={() => setFilter('planned')} style={{ fontWeight: filter === 'planned' ? 'bold' : 'normal' }}>Planned</button>
        <button  onClick={() => setFilter('completed')} style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}>Completed</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="results-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {filteredTitles.map(item => (
          <div key={item.id} className="anime-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', background: '#fafafa'}}>
            {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '4px' }} />}
            <h3 style={{ fontSize: '16px', margin: '10px 0 5px 0' }}>{item.name}</h3>
            <p style={{ fontSize: '13px', color: 'black' }}>Status: <b>{item.status}</b></p>

            {item.url && (
              <div style={{ marginBottom: '10px' }}>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#0066cc', textDecoration: 'none', fontSize: '13px' }}
                >
                  Open on MAL ↗
                </a>
              </div>
            )}
            
            <div className="status-buttons" style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
              <button onClick={() => handleStatusChange(item.id, 'reading')} style={{ fontSize: '12px', padding: '4px' }}>Reading</button>
              <button onClick={() => handleStatusChange(item.id, 'completed')} style={{ fontSize: '12px', padding: '4px' }}>Done</button>
              <button onClick={() => handleStatusChange(item.id, 'planned')} style={{ fontSize: '12px', padding: '4px' }}>Plan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

