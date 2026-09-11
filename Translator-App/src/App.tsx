import { useState, useEffect } from 'react'
import './App.css'

export const TranslatorApp: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>('');
  const [targetText, setTargetText] = useState<string>('');
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('ru');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

const languages = [
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'Английский' },
  { code: 'de', name: 'Немецкий' },
  { code: 'uk', name: 'Украинский' },
  { code: 'es', name: 'Испанский' },
  { code: 'fr', name: 'Французский' },
  { code: 'it', name: 'Итальянский' },
  { code: 'pl', name: 'Польский' },
];
useEffect(() => {
    if (!sourceText.trim()) {
      setTargetText('');
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const langPair = `${sourceLang}|${targetLang}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${langPair}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.responseData) {
          setTargetText(data.responseData.translatedText);
        } else {
          setError("Translating Mistake try!");
        }
      } catch (err) {
        setError("Server Mistake try again!");
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [sourceText, sourceLang, targetLang]);
  return ( 
    <>
      <h1>Translator App</h1>
      <div className='div1'>
        
        <div className='div2'>
          <select className='select1' value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            {languages.map((lang) => (
              <option value={lang.code} key={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="textarea-container">
          <textarea className='textarea1' value={sourceText} onChange={(e) => setSourceText(e.target.value)} placeholder='Enter text'/>
            {sourceText && (
              <button className='button1' onClick={() => setSourceText('')}>X</button>
            )}
            </div>

        </div>

        <div className='div3'>
          <select className='select2' value={targetLang} onChange={(e) => setTargetLang(e.target.value)}> 
            {languages.map((lang) => (
              <option value={lang.code} key={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <textarea className='textarea2' value={targetText} readOnly placeholder='translation'/>
        </div>

      </div>

      <div className='div4'>
        {isLoading && <p style={{ color: '#007bff' }}>Translating...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
   </>
  )
}
