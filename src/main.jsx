import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ShowTimer from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
<StrictMode> 
    <ShowTimer />
  </StrictMode>
)