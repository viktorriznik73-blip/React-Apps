import { useState, useEffect, useRef } from 'react'
import './App.css'
import MessageList from './components/MessageList'
import OpenAI from 'openai'
import { isValidElement } from 'react'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

function App() {
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messageEndRef = useRef(null)

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (inputText.trim() === "" || isLoading) return

    const newmessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    }

    setMessages(prev => [...prev, newmessage])
    setInputText("")
    setIsLoading(true)
    const botMessageId = Date.now() + 1

    setMessages(prev => [...prev, { id: botMessageId, text: '...', sender: 'bot', isThinking: true }])

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: inputText }]
      })

      const fullmessage = completion.choices[0].message.content
      setMessages(prev => prev.map(msg =>
        msg.id === botMessageId ? { ...msg, isThinking: false, text: '', } : msg
      ))

      const interval = setInterval(() => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMessageId) {
            const nextIndex = msg.text.length
            if (nextIndex >= fullmessage.length) {
              clearInterval(interval)
              setIsLoading(false)
              return msg
            }
            return { ...msg, text: msg.text + fullmessage[nextIndex] }
          }
          return msg
        }))
      }, 20)
    } catch (err) {
      console.log('mistake :/', err)
      setMessages(prev => prev.map(msg =>
        msg.id === botMessageId ? { ...msg, isThinking: false, text: 'Error try again!' } : msg
      ))
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>My Personal AI</h1>
    <div className='chat'>
      <MessageList messages={messages} />
      <form onSubmit={handleSendMessage}>
        <input
          type='text'
          value={inputText}
          disabled={isLoading}
          placeholder={isLoading ? 'AI is typing...' : 'Type your message...'}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type='submit' disabled={isLoading}>
          {isLoading ? '...' : '↑'}
        </button>
      </form>
      <div ref={messageEndRef} />
    </div>
    </div>
  )
}

export default App
