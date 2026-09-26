import React, { useState, useEffect } from 'react'
import './App.css'
interface TaskState {
  [key: string]: string[]
}
export default function App() {
  const [currentDated,setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [tasksDate, setTasksDate] = useState<TaskState>(() => {
    const savedTasks = localStorage.getItem('calendar_tasks');
    return savedTasks ? JSON.parse(savedTasks) : {}
  })
  const [taskText, setTaskText] = useState('');
  const [editingCellKey, setEditingCellKey] = useState<null>(null)
  const [editingIndex, setEditingIndex] = useState<null>(null)
  const [editText, setEditText] = useState<string>('');
  const months = [
  { id: 1, name: 'January',  },
  { id: 2, name: 'February',  },
  { id: 3, name: 'March', },
  { id: 4, name: 'April', },
  { id: 5, name: 'May', },
  { id: 6, name: 'June',  },
  { id: 7, name: 'July', },
  { id: 8, name: 'August',  },
  { id: 9, name: 'September', },
  { id: 10, name: 'October',  },
  { id: 11, name: 'November', },
  { id: 12, name: 'December',  }
];
const days = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
]
useEffect(() => {
  localStorage.setItem('calendar_tasks', JSON.stringify(tasksDate))
}, [tasksDate])
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
  const handleAddTask = (e: React.FormEvent): void => {
    e.preventDefault();
  setTasksDate({
    ...tasksDate,
    [datekey]: [...(tasksDate[datekey] || []), taskText]
  })
  setTaskText('')
  }
  const handleDeleteTask = (cellkey: string, taskIndex: number) => {
    setTasksDate({
      ...tasksDate,
      [cellkey]: tasksDate[cellkey].filter((_, index) => index !== taskIndex)
    })
  }
  const handleSaveEdit = (cellkey: string, taskIndex: number) => {
    const updateTasks = [...tasksDate[cellkey]];
    updateTasks[taskIndex] = editText;
    setTasksDate({
      ...tasksDate,
      [cellkey]: updateTasks
    })
    setEditingCellKey(null);
    setEditingIndex(null);
    setEditText('')
  }
  const datekey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
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
  <h3>Adding Tasks for Date: {selectedDate.toLocaleDateString()}</h3>
      <form onSubmit={handleAddTask}>
        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder='Add Task...'/>
              <input type="submit" placeholder='+'/>
              </form>

<div className='grid'>
  {days.map((day) => (
    <div className='day' key={day}>{day}</div>
  ))}
</div>
      <div className='grid'>
        {daysArray.map((day, index,) => {  
          const isToday = 
            day === new Date().getDate() &&
            currentDated.getMonth() === new Date().getMonth() &&
            currentDated.getFullYear() === new Date().getFullYear();

          return ( 
            <div 
              className={day === null ? 'empty-cell' : isToday ? 'today' : 'days'} 
              key={index} onClick={() => {if (day !== null) {setSelectedDate(new Date(currentDated.getFullYear(), currentDated.getMonth(), day))}}}
            >
              {day}
             {day !== null && (
              <ul>
               {tasksDate[`${currentDated.getFullYear()}-${currentDated.getMonth()}-${day}`]?.map((task, taskIndex) => {
        const cellKey = `${currentDated.getFullYear()}-${currentDated.getMonth()}-${day}`;
        const isEditing = editingCellKey === cellKey && editingIndex === taskIndex;
        return (
          <li key={taskIndex} onClick={(e) => e.stopPropagation()}>
           {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input
          className='input' 
            type="text" 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
          />
          <button className="save" onClick={() => handleSaveEdit(cellKey, taskIndex)}>Save</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* Текст задачи теперь идет первым и занимает свою строку */}
          <span style={{ wordBreak: 'break-word', color: 'black', fontSize: '20px' }}>{task}</span>
          
          {/* Контейнер для кнопок под текстом */}
          <div>
            <button className="edit" onClick={() => {
              setEditingCellKey(cellKey);
              setEditingIndex(taskIndex);
              setEditText(task);
            }}>
              Edit
            </button>
            <button className="delete" onClick={() => handleDeleteTask(cellKey, taskIndex)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
})}
              </ul>
             )}
            </div>
            
          );
        })}
      </div>
      </div>
  )
}