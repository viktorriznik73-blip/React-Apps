import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import './App.css'
interface Search {
id: number
name: string,
link: string,
description: string
}
export default function GoogleSearch() {
  const [textInput, setInputText] = useState<string>("")
  const [googleChange, setGoogleChange] = useState<Search[]>([])
  useEffect(() => {
    if (textInput.trim() === '') {
     setGoogleChange([])
     return
    }

    const fetchSuggestions = async () => {
      try {
     const response = await fetch(`/api/google?q=${encodeURIComponent(textInput)}`);
          const data = await response.json()
              const suggestions: string[] = data[1] || [];

            const formattedResults: Search[] = suggestions.map((item, index) => ({
              id: index,
          name: item,
              link: `https://www.google.com/search?q=${encodeURIComponent(item)}`,
              description: "Search"
            }))
            setGoogleChange(formattedResults)
      } catch (error) {
      console.log("Fetching mistake!", error)
      }
    }
    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [textInput])

  const handleChange = (e: any) => {
   setInputText(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
   if (e.key === 'Enter' && textInput.trim() !== '') {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(textInput)}`;
   }
  }
 
  return (
    <>
      <h1>Google</h1>
      <div className='search-wrapper'>
        <div className='div1'>
          <div className="search-bar-container">
            <input 
              type="text" 
              value={textInput} 
              onChange={handleChange} 
              onKeyDown={handleKeyDown} 
              className='input1' 
            />
            <FiSearch className='search-icon' />
          </div>

          {googleChange.length > 0 && (
            <div className="dropdown-list">
              {googleChange.map(data => (
                <div 
                  key={data.id} 
                  className="dropdown-item" 
                  onClick={() => {
                    window.location.href = data.link
                  }}
                >
                  <div>{data.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}


