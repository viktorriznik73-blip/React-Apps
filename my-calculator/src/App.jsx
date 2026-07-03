import { useState } from 'react'
import './App.css'

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

  function handleNumber(digit) {
    if (currentValue === '0') {
        setCurrentValue(digit)
    } else {
      setCurrentValue(currentValue + digit)
    }
  }
  function handleOperator(op) {
    setPreviousValue(currentValue);
    setOperation(op);
    setCurrentValue('0')
  }
  function clearCalculator() {
   setCurrentValue('0')
   setPreviousValue(null)
   setOperation(null);
  }
  function calculateResult() {
    if (previousValue === null) {
      return;
    }
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);
let result = 0;
    if (operation === '+') {
      result = num1 + num2;
    } else if (operation === '-') {
       result = num1 - num2;
    } else if (operation === '/') {
      result = num1 / num2;
    } else if (operation === '*') {
      result = num1 * num2;
    }
        setCurrentValue(String(result));
    setPreviousValue(null)
    setOperation(null);
  }
  return (
    <div>{currentValue}
    <button onClick={() => handleNumber('1')}>1</button>
    <button onClick={() => handleNumber('2')}>2</button>
    <button onClick={() => handleNumber('3')}>3</button>
    <button onClick={() => handleNumber('4')}>4</button>
    <button onClick={() => handleNumber('5')}>5</button>
    <button onClick={() => handleNumber('6')}>6</button>
    <button onClick={() => handleNumber('7')}>7</button>
    <button onClick={() => handleNumber('8')}>8</button>
    <button onClick={() => handleNumber('9')}>9</button>
    <button onClick={() => handleNumber('0')}>0</button>
    <button onClick={() => handleOperator('+')}>+</button>
    <button onClick={() => handleOperator('-')}>-</button>
    <button onClick={() => handleOperator('/')}>/</button>
    <button onClick={() => handleOperator('*')}>*</button>
    <button onClick={calculateResult}>=</button>
    <button onClick={clearCalculator}>C</button>
    </div>
  )
}

export default App
