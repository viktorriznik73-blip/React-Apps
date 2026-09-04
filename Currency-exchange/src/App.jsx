import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('USD')
  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
    .then((res) => res.json())
    .then((data) => {
      setRates(data.rates)
    })
  }, [fromCurrency])
  const convertedAmount = rates[toCurrency]
  ? (amount * rates[toCurrency].toFixed(2))
  : ''
  return (
    <div className="converter">
      <h1>Currency-exchange</h1>
      <div className="input-group">
        <input className='input1' type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
     <select className='select1' value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
{Object.keys(rates).map((currency) => (
  <option value={currency} key={currency}>
    {currency}
  </option>
))}
     </select>
     </div>
     <div className="input-group">
        <input className='input2' type='text' value={convertedAmount} readOnly/>
     <select className='select2' value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
{Object.keys(rates).map((currency) => (
  <option value={currency} key={currency}>
    {currency}
  </option>
))}
     </select>
     </div>
     </div>
  )
}


