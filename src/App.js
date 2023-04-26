import { useState } from "react";

function Square({ squarevalue, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {squarevalue}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function squareClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const newSquares = squares.slice();

    if (xIsNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    onPlay(newSquares);
  }

  const calculateWinner = () => {
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  };

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player is: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          squarevalue={squares[0]}
          onSquareClick={() => squareClick(0)}
        ></Square>
        <Square
          squarevalue={squares[1]}
          onSquareClick={() => squareClick(1)}
        ></Square>
        <Square
          squarevalue={squares[2]}
          onSquareClick={() => squareClick(2)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          squarevalue={squares[3]}
          onSquareClick={() => squareClick(3)}
        ></Square>
        <Square
          squarevalue={squares[4]}
          onSquareClick={() => squareClick(4)}
        ></Square>
        <Square
          squarevalue={squares[5]}
          onSquareClick={() => squareClick(5)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          squarevalue={squares[6]}
          onSquareClick={() => squareClick(6)}
        ></Square>
        <Square
          squarevalue={squares[7]}
          onSquareClick={() => squareClick(7)}
        ></Square>
        <Square
          squarevalue={squares[8]}
          onSquareClick={() => squareClick(8)}
        ></Square>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (newSquares) => {
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory([...newHistory]);
    setCurrentMove(newHistory.length - 1);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move " + move;
    } else {
      description = "Go to start";
    }

    return (
      <li key={move}>
        <button onClick={() => setCurrentMove(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
