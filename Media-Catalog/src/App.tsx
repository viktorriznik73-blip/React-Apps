import { useState } from 'react'
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
  const [titles, setTitles] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
 

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
      
      const mockTitles: Anime[] = [
        {
          id: 1,
          name: `${searchQuery || 'Quintessential-Quintuplets'}`,
          genre: 'Comedy',
          status: 'reading',
          image: 'https://static.yani.tv/posters/huge/1636926847.avif',
          url: 'https://myanimelist.net/manga/103851/Gotoubun_no_Hanayome'
        },
        {
          id: 2,
          name: `${searchQuery || 'The Fragrant Flower Blooms with Dignity' }`,
          genre: 'Romantic comedy',
          status: 'planned',
          image: 'https://shikimori.io/uploads/poster/animes/59845/main_2x-a4fda62f6583f18bad6c6b5b6044904a.webp',
url: 'https://myanimelist.net/manga/144267/Kaoru_Hana_wa_Rin_to_Saku'
        }
      ]

      setTitles(mockTitles)
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
    
 return (
    <div className='div1'>
      <input 
        type="text" 
        value={searchQuery}
        onChange={handleChange} 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            fetchMedia('manga')
          }
        }} 
        placeholder='Search...'
      />
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div className="results-container">
        {titles.map(item => (
          <div key={item.id} className="anime-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            {item.image && <img src={item.image} alt={item.name} width="100" />}
            <h3>{item.name}</h3>
            <p>Status: {item.status}</p>

            {item.url && (
              <div style={{ marginBottom: '10px' }}>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#1a0dab', textDecoration: 'underline' }}
                >
              Open on MyAnimeList
                </a>
              </div>
            )}
            
            <div className="status-buttons">
              <button onClick={() => handleStatusChange(item.id, 'reading')}>
                Reading
              </button>
              <button onClick={() => handleStatusChange(item.id, 'completed')}>
                Completed
              </button>
              <button onClick={() => handleStatusChange(item.id, 'planned')}>
                Planned
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

