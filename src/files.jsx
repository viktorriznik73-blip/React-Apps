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

   return (
      <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
         <h1>ToDoList</h1>     
         <input 
            className='inpur' 
            value={inputvalue} 
            onChange={(e) => setInputValue(e.target.value)} 
<<<<<<< HEAD
            placeholder='type your text here'
=======
            placeholder='type your text there'
>>>>>>> 6c82c904c79d118175ea38907551d989ac6bd40d
            style={{ padding: '8px', fontSize: '16px' }}
         />
         <button className='butto' onClick={AddNewTask} style={{ padding: '8px 15px', marginLeft: '10px', cursor: 'pointer' }}>
            NEW Task
         </button>
<<<<<<< HEAD
         <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
=======
         <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
>>>>>>> 6c82c904c79d118175ea38907551d989ac6bd40d
            {todos.map((todo) => (
               <li key={todo.id} style={{ margin: '5px 0', fontSize: '18px' }}>
                  {todo.text}
               </li>
            ))}
         </ul>
      </div>
   );
}

// 3. Главный компонент, который объединяет всё и экспортируется по умолчанию
export default function App() {
   const [timer, setTimer] = useState("");
   const [isRunning, setIsRunning] = useState(false);

   useEffect(() => {
      let interval = null;

      if (isRunning) {
         interval = setInterval(() => {
            const now = new Date();
            setTimer(now.toLocaleString());
         }, 1000);
      } else {
         clearInterval(interval);
      }
      return () => clearInterval(interval);
   }, [isRunning]);

   const handleToggle = () => {
      setIsRunning(!isRunning);

      if (!isRunning) {
         // Исправленный баг: создаем объект даты прямо здесь
         setTimer(new Date().toLocaleString());
      }
   };

   return (
      <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
         {/* Секция Таймера */}
         <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
            <HeaderTitle />
            <button 
               onClick={handleToggle} 
               style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', borderRadius: '50px' }}
            >
               {isRunning ? `now is ${timer}` : 'Start timer'}
            </button>
         </div>

         {/* Секция ToDo Листа */}
         <ToDoList />
      </div>
   );
}