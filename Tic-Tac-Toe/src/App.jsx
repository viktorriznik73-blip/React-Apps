import { useState } from 'react';
import './App.css';

// Функция расчета победителя, которая возвращает победителя и индекс линии для CSS
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // index 0 (горизонтальная 1)
    [3, 4, 5], // index 1 (горизонтальная 2)
    [6, 7, 8], // index 2 (горизонтальная 3)
    [0, 3, 6], // index 3 (вертикальная 1)
    [1, 4, 7], // index 4 (вертикальная 2)
    [2, 5, 8], // index 5 (вертикальная 3)
    [0, 4, 8], // index 6 (диагональ слева направо)
    [2, 4, 6]  // index 7 (диагональ справа налево)
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], lineIndex: i };
    }
  }
  return null;
}

// Компонент для отдельной клетки
function Square({ value, onSquareClick }) {
  return (
    <button className="button1" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Компонент доски
function Board({ xIsNext, squares, onPlay, winLineIndex }) {
  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.winner : null;
  const isDraw = !winner && squares.every(Boolean);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = `Game is a draw!`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="board-container">
      <h2>Tic-Tac-Toe game</h2>
      <h3>{status}</h3>
      <div className="board">
        {squares.map((value, index) => (
          <Square 
            key={index} 
            value={value} 
            onSquareClick={() => onPlay(index)} 
          />
        ))}
        {/* Победная линия отрисовывается, если линия найдена */}
        {winLineIndex !== null && <div className={`winning-line line-${winLineIndex}`}></div>}
      </div>
    </div>
  );
}

// Главный компонент игры
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winInfo = calculateWinner(currentSquares);
  const winLineIndex = winInfo ? winInfo.lineIndex : null;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Функция сброса игры
  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function toggleSortOrder() {
    setIsAscending((prev) => !prev);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} className='move'>
        <button onClick={() => jumpTo(move)} className='jump'>{description}</button>
      </li>
    );
  });

  const orderedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className='game'>
      <h1>Tic-Tac-Toe</h1>
      <div className='game-container'>
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={(index) => {
            if (currentSquares[index] || winInfo) return;
            const nextSquares = [...currentSquares];
            nextSquares[index] = xIsNext ? 'X' : 'O';
            handlePlay(nextSquares);
          }} 
          winLineIndex={winLineIndex}
        />
        
        {/* Кнопка сброса */}
        <button onClick={resetGame} className='button2'>
          Start again
        </button>
      </div>

      <div className='game-info'>
        <button className='ascending' onClick={toggleSortOrder}>
          {isAscending ? 'Show newest first' : 'Show oldest first'}
        </button>
        <ol>{orderedMoves}</ol>
      </div>
    </div>
  );
}