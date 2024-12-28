import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Game board state
  const [isXNext, setIsXNext] = useState(true); // Tracks the current player
  const [winner, setWinner] = useState(null); // Stores the winner, if any

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore clicks on filled or winning cells

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    checkWinner(newBoard); // Check for a winner after every move
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner("Draw"); // If all cells are filled and no winner, it's a draw
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderCell = (index) => (
    <button className={`cell ${winner ? "disabled" : ""}`} onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="tic-tac-toe">
      <div className="status">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Winner: ${winner}`
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
