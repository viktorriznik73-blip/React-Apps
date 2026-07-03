import { useState, useEffect } from 'react'
import './App.css'

// зделать функцию для кнопки
// зделать функцию для таймера

<<<<<<< HEAD
function HeaderTitle() {
   return ( 
      <div style={{textAlign: 'center', marginTop: '20px'}}>
   <h1>Timer test</h1>
      </div>
   )
=======
 function HeaderTitle() {
  return (
    <div style={{textAlign: 'center', marginTop: '20px'}}>
        <h1>Timer test</h1>
    </div>
  )
>>>>>>> 6c82c904c79d118175ea38907551d989ac6bd40d
}
export default function ShowTimer() {
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
      setIsRunning(!isRunning)

         if (!isRunning) {
       setTimer(now.toLocaleString());
         }
   };

<<<<<<< HEAD
   return (
      <div style={{textAlign: 'center'}}>
         <HeaderTitle />
         <button onClick={handleToggle} style={{padding: '10px 20px', fontSize: '18px', cursor: 'pointer'}}>
            {isRunning ? `Now is ${timer}` : "Start timer"}
         </button>
      </div>
   )
}
=======
    return (
        <div style={{ textAlign: 'center' }}>
            <HeaderTitle />

            <button onClick={handleToggle} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}>
                {isRunning ? `Now is ${timer}` : "Start timer"}
            </button>
       
        </div>
    )
    }
>>>>>>> 6c82c904c79d118175ea38907551d989ac6bd40d
