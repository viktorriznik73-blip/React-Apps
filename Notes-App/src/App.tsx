import { useState, useEffect } from 'react'
import './App.css'

interface Note {
  id: number, 
  title: string,
  date: string,
  content: string
}

function NotesApp() {
const [content, setContent] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('my-notes-app')
  if (savedNotes) {
    return JSON.parse(savedNotes)
  }
  return [];
});
const [editingId, setEditingId] = useState<number | null>(null)

useEffect(() => {
  localStorage.setItem('my-notes-app', JSON.stringify(notes))
}, [notes])
const handleSaveNote = () => {
  if (content.trim() === '') return

  if (editingId !== null) {
    setNotes(notes.map((note) => note.id === editingId
     ? {...note, content: content,
                title: content.slice(0, 15) + '...',
                date: new Date().toLocaleString() + ' (ред.)',} : note))
                setEditingId(null)
  } else {
     const newNote: Note = {
   id: Date.now(),
     title: content.slice(0, 15) + "",
      date: new Date().toLocaleString(),
       content: content,
 }
setNotes([newNote, ...notes])
  }
  setContent('')
}
const handleEditNote = (note:Note) => {
  setContent(note.content)
  setEditingId(note.id)
}
  const handleDeleteNote = (id:number) => {
   setNotes(notes.filter((note) => note.id !== id))
   if (editingId === id) {
    setEditingId(null)
    setContent('')
   }
}
const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    handleSaveNote();
  }
}
 return (
  <div className='form-container'>
    <h1>Notes App</h1>
    <div className='input-wrapper'>
       <textarea value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={handleKeyDown} placeholder='Take note...'></textarea>
    <button className='save' onClick={handleSaveNote}>{editingId !== null ? 'Edit' : '✓'}</button>
    {content.trim() !== '' && (
      <button className='clear-btn' onClick={() => {setContent(''), setEditingId(null)}}>✕</button>
    )}
    </div>
   <div className="notes-list">
    {notes.map((note) => (
      <div key={note.id}>
      <h3>{note.title}</h3>
       <p>{note.content}</p>
       <small>{note.date}</small> 
       <div>
        <button className='edit' onClick={() => handleEditNote(note)}>Edit</button>
        <button className='delete' onClick={() => handleDeleteNote(note.id)}>Delete</button>
        </div> 
       </div>
    ))}
    </div>
   </div>
 )
}
export default NotesApp

