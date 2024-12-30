import "./style.css";
import { Provider } from "../src/components/ui/provider";
import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xTurn, squares, onPlay }) {
  const winner = determineWinner(squares);
  let stat, win;
  if (winner) {
    stat = "Game Over";
    win = `${winner} is the Winner!`;
  } else {
    stat = `Next turn: ${xTurn ? "X" : "O"}`;
    win = "";
    if (!squares.includes(null)) {
      stat = "Game Over";
      win = "It's a Draw!";
    }
  }

  function handleClick(i) {
    if (squares[i] || determineWinner(squares)) return;
    const nextSquare = squares.slice();
    xTurn ? (nextSquare[i] = "X") : (nextSquare[i] = "O");
    onPlay(nextSquare);
    //console.log(squares);
  }
  function determineWinner(square) {
    const list = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < list.length; i++) {
      const [a, b, c] = list[i];
      if (square[a] && square[a] === square[b] && square[b] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  return (
    <div className="container">
      <div className="status">{stat}</div>
      <div className="row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="winner">
        <Text
          p={"10px"}
          borderRadius={"20px"}
          background={"yellow.300"}
          fontSize={"40px"}
        >
          {win}
        </Text>
      </div>
    </div>
  );
}

export default function Game() {
  const [xTurn, setXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];

  function handlePlay(nextSquare) {
    const nextHist = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHist);
    setCurrentMove(nextHist.length - 1);
    setXTurn(!xTurn);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXTurn(nextMove % 2 === 0);
  }
  const moves = history.map((square, move) => {
    // The map() function is a concise and efficient way to transform the history array into an array
    // of JSX elements (buttons in this case).The map() function takes a callback function as an argument.
    //  This callback function has two parameters:
    // - squares: The individual element of the history array for the current iteration.This
    //   represents the state of the game board at a specific move.
    // - move: The index of the current iteration, which corresponds to the move number.
    //   (e.g., 0 for the starting point, 1 for the first move, etc.)
    let description;

    if (move > 0) {
      description = `Go to move #${move}`;
      if (move == currentMove) {
        description = "Current move";
      }
      // console.log("move: "+move);
      // console.log("currentMove: " + currentMove);
    } else {
      description = `Go to game start`;
    }
    return (
      <Button
        key={move}
        onClick={() => jumpTo(move)}
        colorPalette={move == currentMove ? "green" : "teal"}
        variant="solid"
      >
        {description}
      </Button>
    );
  });
  return (
    <Provider>
      <div className="game">
        <div className="game-board">
          <Board xTurn={xTurn} squares={currentSquare} onPlay={handlePlay} />
        </div>
        <div className="game-history">
          <Text fontSize={"20px"}>Game History</Text>
          {moves}
        </div>
      </div>
    </Provider>
  );
}
