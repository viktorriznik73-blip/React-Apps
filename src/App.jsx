import { useState, useEffect } from 'react';
import './App.css';

// 1. Вспомогательный компонент заголовка для таймера
function HeaderTitle() {
   return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
         <h1>Timer Test</h1>
      </div>
   );
}

// 2. Компонент Списка Дел (ToDoList)
function ToDoList() {
   const [inputvalue, setInputValue] = useState("");
   const [todos, setTodos] = useState([]);

   function AddNewTask() {
      if (inputvalue.trim() !== '') {
         const newtodo = {
            id: Date.now(),
            text: inputvalue,
            isComplete: false
         };
         setTodos([...todos, newtodo]);
         setInputValue("");
      }
   }
   function DeleteTask(idtoDelete) {
    const updatetask = todos.filter(todo => todo.id !== idtoDelete)
    setTodos(updatetask)
   }
   return (
    <div style={{textAlign: 'center', marginTop: '40px', borderTop: '1px solid #0c00f9', paddingTop: '20px'}}>
   <h1>ToDoList</h1>
   <input className='inpur' value={inputvalue} onChange={(e) => setInputValue(e.target.value)} placeholder='type your text'/>
   <button className='butto' onClick={AddNewTask}>Set Task</button>
   <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
       {todos.map((todo) => (
        <li key={todo.id}>
            <span>{todo.text}</span>
       <button onClick={() => DeleteTask(todo.id)} className='bum'>DELETE</button>
       </li>
       ))}
   </ul>
      </div>
   );
}
export default function App() {
    const [timer, setTimer] = useState("")
    const [isRunning, setIsRunning] =  useState(false);
    useEffect(() => {
        let interval = null;
    if (isRunning) {
        interval = setInterval(() => {
            setTimer(new Date().toLocaleString())
        }, 1000)
    } else {
        clearInterval(interval)
    }
    return () => clearInterval(interval)
    }, [isRunning]);

    const handleToggle = () => {
        setIsRunning(!isRunning)
        if (!isRunning) {
      setTimer(new Date().toLocaleString())
        }
    }
    return (
        <div style={{maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif'}}>
            <div style={{textAlign: 'center', paddingBottom: '20px'}}>
                <HeaderTitle />
                <button onClick={handleToggle} style={{padding: '10px 20px', fontSize: '18px', cursor: 'pointer', borderRadius: '50px'}}>
                    {isRunning ? `Now is ${timer}` : 'Start timer'}
                </button>
            </div>
            <ToDoList />
        </div>
    );
}