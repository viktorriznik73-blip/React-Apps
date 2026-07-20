import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// зделать линию при выигрише X или O
// зделать кнопку Reset что бы заново начать
//
//
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)

  const winInfo = calculateWinner(board);
 const winner = winInfo ? winInfo.winner : null;
 const lineIndex = winInfo ? winInfo.lineIndex : null;

  function handleClick(index) {
   const copy = [...board];
   if (copy[index] || winner) return;
    copy[index] = isX ? 'X' : 'O';
    setBoard(copy)
    setIsX(!isX)
  }
  function ResetGame() {
  setBoard(Array(9).fill(null))
  setIsX(true)
  }
  return (
    <div className='game'>
      <h1>Tic-Tac-Toe game</h1>
      {winner ? <h2>Winner: {winner}</h2> : <h2>Next Player: {isX ? 'X' : '0'}</h2>}
    <div className='game-container'>
    <div className='board'>
   {board.map((value, index) => (
    <button onClick={() => handleClick(index)} key={index} className='button1'>{value}</button>
   ))}
   {lineIndex !== null && <div className={`winning-line line-${lineIndex}`}></div>}
    </div>
    <button onClick={ResetGame} className='button2'>Start again</button>
    </div>
    </div>
  )
}
  function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // index 0 (горизонтальная 1)
    [3, 4, 5], // index 1 (горизонтальная 2)
    [6, 7, 8], // index 2 (горизонтальная 3)
    [0, 3, 6], // index 3 (вертикальная 1)
    [1, 4, 7], // index 4 (вертикальная 2)
    [2, 5, 8], // index 5 (вертикальная 3)
    [0, 4, 8], // index 6 (диагональ слева направо)
    [2, 4, 6] // index 7 (диагональ справа налево)
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], lineIndex: i};
    }
  }
  return null;
}

export default App;
