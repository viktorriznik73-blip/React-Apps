import { useState } from 'react'
import './App.css'
export default function App() {
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
const days = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
]

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
  const rawDayIndex = new Date(currentDated.getFullYear(), currentDated.getMonth(), 1).getDay();
  const firstDayIndex = rawDayIndex === 0 ? 6 : rawDayIndex - 1;
    const Month = new Date(currentDated.getFullYear(), currentDated.getMonth() + 1, 0).getDate()
    const monthArray = Array.from({ length: Month, }, (_, index) => index + 1);
    const daysArray = [...Array(firstDayIndex).fill(null), ...monthArray]
  return (
    <div>
      <button onClick={handlePrevMonth} className='prev'>Prev Month</button>
<span>
{months[currentDated.getMonth()].name} {[currentDated.getFullYear()]}
</span>
<button onClick={handleNextMonth} className='next'>Next Month</button>
<div className='grid'>
  {days.map((day) => (
    <div className='day' key={day}>{day}</div>
  ))}
</div>
      <div className='grid'>
        {daysArray.map((day, index) => {  
          const isToday = 
            day === new Date().getDate() &&
            currentDated.getMonth() === new Date().getMonth() &&
            currentDated.getFullYear() === new Date().getFullYear();

          return (
            <div 
              className={day === null ? 'empty-cell' : isToday ? 'today' : 'days'} 
              key={index}
            >
              {day}
            </div>
          );
        })}
      </div>
      </div>
  )
}