import React, { useState, useEffect } from 'react'
import './App.css'
interface TaskState {
  [key: string]: TaskItem[],
}
interface TaskItem {
  text: string,
  reminder?: string
}
export default function App() {

  const [currentDated,setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [taskTime, setTaskTime] = useState('')
  const [tasksDate, setTasksDate] = useState<TaskState>(() => {
    try {
    const savedTasks = localStorage.getItem('calendar_tasks');
    return savedTasks ? JSON.parse(savedTasks) : {}
    } catch (e) {
    console.error("Ошибка чтения localStorage:", e);
      return {};
    }
  })
  const [taskText, setTaskText] = useState('');
  const [editingCellKey, setEditingCellKey] = useState<string | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editText, setEditText] = useState<string>('');
   const [editTime, setEditTime] = useState<string>('');
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
  if (typeof window !== 'undefined' && 'Notification' in window) {
   if (Notification.permission !== 'granted') {
    Notification.requestPermission()
   }
  }
const interval = setInterval(() => {
  const now = new Date();
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const currentTime = `${hours}:${minutes}`
const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  const todayTasks = tasksDate[todayKey] || [];
  todayTasks.forEach((task) => {
    if (task.reminder === currentTime && typeof window !== 'undefined' && Notification.permission === 'granted') {
      new Notification(task.text, {
        body: `Time: ${task.reminder}`,
      })
    }
  })
}, 60000)
return () => clearInterval(interval)
}, [tasksDate])
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
  const handleAddTask = (e?: React.FormEvent | React.SyntheticEvent) => {
    if (e) {
      e.preventDefault()
  }
  if(!taskText.trim()) return;
  setTasksDate({
    ...tasksDate,
    [datekey]: [...(tasksDate[datekey] || []), { text: taskText, reminder: taskTime }]
  });
  
  setTaskText(''); 
  setTaskTime('')
};
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    handleAddTask();
  }
}
  const handleDeleteTask = (cellkey: string, taskIndex: number) => {
    setTasksDate({
      ...tasksDate,
      [cellkey]: tasksDate[cellkey].filter((_, index) => index !== taskIndex)
    })
  }
  const handleSaveEdit = (cellkey: string, taskIndex: number) => {
    const updateTasks = [...tasksDate[cellkey]];
    updateTasks[taskIndex] = {
      ...updateTasks[taskIndex],
      text: editText,
      reminder: editTime
    };
    setTasksDate({
      ...tasksDate,
      [cellkey]: updateTasks
    })
    setEditingCellKey(null);
    setEditingIndex(null);
    setEditText('')
    setEditTime('')
  }

  const datekey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
  const rawDayIndex = new Date(currentDated.getFullYear(), currentDated.getMonth(), 1).getDay();
  const firstDayIndex = rawDayIndex === 0 ? 6 : rawDayIndex - 1;
    const Month = new Date(currentDated.getFullYear(), currentDated.getMonth() + 1, 0).getDate()
    const monthArray = Array.from({ length: Month, }, (_, index) => index + 1);
    const daysArray = [...Array(firstDayIndex).fill(null), ...monthArray]
    
  return (
    <div>
      <div className="calendar-nav">
  <button onClick={handlePrevMonth} className='prev'>Prev Month</button>
  <span>
    {months[currentDated.getMonth()].name} {currentDated.getFullYear()}
  </span>
  <button onClick={handleNextMonth} className='next'>Next Month</button>
</div>
  <h3>Adding Tasks for Date: {selectedDate.toLocaleDateString()}</h3>
      <form onSubmit={handleAddTask}>
        <input onKeyDown={handleKeyDown}
   className='input2' type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder='Add Task...'/>
              <input className='time' type="time" value={taskTime}  onChange={(e) => setTaskTime(e.target.value)}/>
              <input type="submit" placeholder='+' className='submit'/>
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
const isSelected = 
day !== null &&
selectedDate.getDate() === day &&
selectedDate.getMonth() === currentDated.getMonth() &&
      selectedDate.getFullYear() === currentDated.getFullYear();
          return ( 
            <div 
              className={
          day === null 
            ? 'empty-cell' 
            : isSelected 
            ? 'selected-day' 
            : isToday 
            ? 'today' 
            : 'days'
        }
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                 e.preventDefault();
                 handleSaveEdit(cellKey, taskIndex)
              }
            }} 
          />
          <input className='edit-time' type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                 e.preventDefault();
                 handleSaveEdit(cellKey, taskIndex)
              }
            }} />
          <button className="save" onClick={() => handleSaveEdit(cellKey, taskIndex)}>Save</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span className='list'>{task.text}, {task.reminder}</span>
          
          <div>
            <button className="edit" onClick={() => {
              setEditingCellKey(cellKey);
              setEditingIndex(taskIndex);
              setEditText(task.text);
              setTaskTime(task.reminder || '')
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