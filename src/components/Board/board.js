import { useState } from "react";
import "./board.css";
import Square from "../Square/square";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isTurnX, setIsTurnX] = useState(true);

  let winner = null;
  let winnerLine = [];

  const calculateWinner = (squares) => {
    // prevents unnecessary process if winner exists
    if (winner) {
      return winner;
    }

    // if the board is full but there is no winner
    if (!squares.some((sqr) => sqr === null)) return "none";

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winnerLine = lines[i];
        return squares[a];
      }
    }

    return null;
  };

  const onClickSquare = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isTurnX ? "X" : "O";
    setIsTurnX(!isTurnX);
    setSquares(newSquares);
  };

  const renderSquare = (i) => {
    let className = "square hoverable clickable";
    if (winnerLine.includes(i)) className = "square green";
    else if (winner || squares[i] !== null) className = "square";

    return (
      <Square
        value={squares[i]}
        onClick={() => onClickSquare(i)}
        sqrClass={className}
      />
    );
  };

  winner = calculateWinner(squares);
  let status;
  if (winner === null) status = "Play turn: " + (isTurnX ? "X" : "O");
  else if (winner === "none") status = "Draw!";
  else status = "Winner: " + winner;

  return (
    <div className="board-container">
      <div className="info">{status}</div>
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

export default Board;
