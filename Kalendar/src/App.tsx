import { useState } from 'react'
import './App.css'
function App() {
  const [currentDated,setCurrentDate] = useState<Date>(new Date())
  const months = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' }
];

  const handleNextMonth = () => {
    const month = currentDated.getMonth();
    const year = currentDated.getFullYear();
    
    setCurrentDate(new Date(year, month + 1, 1))
  }
  const handlePrevMonth = () => {
     const month = currentDated.getMonth();
    const year = currentDated.getFullYear();
    
    setCurrentDate(new Date(year, month - 1, 1))
  }
  return (
    <div>
<button  onClick={handlePrevMonth}>Back</button>
<span>
{months[currentDated.getMonth()].name} {[currentDated.getFullYear()]}
</span>
<button onClick={handleNextMonth}>Next</button>
    </div>
  )
}

export default App
