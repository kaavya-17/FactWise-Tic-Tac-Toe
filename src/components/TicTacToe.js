import React, { useState } from 'react';
import './TicTacToe.css';

const boardSize = 3;

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningSquares = winnerInfo ? winnerInfo.line : [];
  const isDraw = !winner && squares.every(square => square);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : '✓';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => (
    <button 
      className={`square ${winningSquares.includes(index) ? 'winning-square' : ''}`} 
      onClick={() => handleClick(index)}
    >
      {squares[index]}
    </button>
  );

  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return 'It\'s a Draw!';
    return `Next player: ${isXNext ? 'X' : '✓'}`;
  };

  return (
    <div className="game">
      <div className="title">Tic Tac Toe</div>
      <div className="board">
        {[...Array(boardSize)].map((_, row) => (
          <div key={row} className="board-row">
            {[...Array(boardSize)].map((_, col) => renderSquare(row * boardSize + col))}
          </div>
        ))}
      </div>
      <div className="status">{getStatus()}</div>
      <button className="restart-button" onClick={() => { setSquares(Array(boardSize * boardSize).fill(null)); setIsXNext(true); }}>Reset</button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

export default TicTacToe;
