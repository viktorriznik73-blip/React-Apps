import { useState, useEffect } from 'react';
import './App.css';

function HeaderTitle() {
    return (
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <h1 className='hi'>Timer Test</h1>
        </div>
    )
}
function ToDoList() {
   const [inputvalue, setInputValue] = useState('')
   const [todos, setTodos] = useState([])

 function AddNewTask() {
    if (inputvalue.trim() === '') {
      alert('Type your text!')
      return;
    }
        const newtodo = {
            id: Date.now(),
            text: inputvalue,
            isComplete: false
        
        }
      
        setTodos([...todos, newtodo])
        setInputValue("")   
 }
    function DeleteTask(idToDelete) {
        const updateTodos = todos.filter(todo => todo.id !== idToDelete);
        setTodos(updateTodos);
    }
 return (
    <div style={{textAlign: 'center', marginTop: '40px', borderTop: '1px solid #ff0000', paddingTop: '20px'}}>
        <h1 className='h1'>TodoList</h1>
       <input
       className='inpur'
       value={inputvalue}
       onChange={(e) => setInputValue(e.target.value)}
       placeholder='Type text'
       style={{padding: '8px', fontSize: '16px'}}
       />
       <button onClick={AddNewTask} className='butto' style={{padding: '8px 15px', marginLeft: '10px', cursor: 'pointer'}}>
        NEW TASK
       </button>
       <ul style={{listStyleType: 'none', padding: '0', marginTop: '20px'}}>
        {todos.map((todo) => (
        <li key={todo.id} style={{margin: '5px 0', fontSize: '18px'}}>{todo.text}
            <button onClick={() => DeleteTask(todo.id)} style={{marginLeft: '15px', cursor: 'pointer', padding: '10px 20px',}} className='bum'>DELETE</button>
        </li>
        ))}
       </ul>
    </div>
 )
}
export default function App() {
    const [timer, setTimer] = useState("")
    const [isRunning,setIsRunning] = useState(false)
    useEffect(() => {
        let interval = null;
      if (isRunning) {
        interval = setInterval(() => {
            const now = new Date();
            setTimer(now.toLocaleString());
        }, 1000)
    } else {
        clearInterval(interval)
    }
    return () => clearInterval(interval)
    }, [isRunning])
    const handleToggle = () => {
        setIsRunning(!isRunning)
            if (isRunning) {
                setTimer(new Date().toLocaleString());
            }
        };
        return (
            <div style={{textAlign: 'center'}}>
                <HeaderTitle />
                <button onClick={handleToggle} className='bbb' style={{padding: '10px 20px', fontSize: '18px', cursor: 'pointer', borderRadius: '50px'}}>
                    {isRunning ? `Now is ${timer}` : 'Start timer'}
                </button>
                <ToDoList />
            </div>
        )
}  