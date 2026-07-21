import { useState } from 'react'
import './App.css'
 
function App() {
  const [num1, setNum1] = useState(1);
   const [num2, setNum2] = useState(2);
   const [state, setState] = useState({ num1: 1, num2: 2, response: '', score: 0, incorrect: false, correct: false})
   function updateResponse(event) {
    setState({
      ...state,
      response: event.target.value
    })
   }
   function updateEnter(event) {
    if (event.key === 'Enter') {
      const answer = parseInt(state.response)
      if (state.num1 + state.num2 === answer) {
       setState({
          ...state,
          num1: Math.ceil(Math.random() * 10),
          num2: Math.ceil(Math.random() * 10),
           score: state.score + 1,
           response: '',
           incorrect: false,
           correct: true
          })
      } else {
        setState({
          ...state,
           score: state.score - 1,
           response: '',
           incorrect: true,
           correct: false
          })
      }
      }
   } 
   if (state.score === 10) {
    return (
    <div id='winner'>
      You won the game!
    </div>
    )
   }
 return (
  <div>
    <div id='number' className={state.incorrect ? "incorrect" : "correct"}>{state.num1} + {state.num2}</div>
    <input autoFocus={true} onKeyPress={updateEnter} onChange={updateResponse} type="text" value={state.response}/>
    <div>Score: {state.score}</div>
  </div>
 )

}
export default App
