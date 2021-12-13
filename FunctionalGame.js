import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from '../helper/calculate.js';

const Game = () => {

    const [history, setHistory] = useState({
        squares: Array(9).fill(null)
    });
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(0);
    
    const handleClick = (i) => {
      const history = history.slice(0, stepNumber + 1);
      const current = history[history.length - 1];
      const mySquares = [...current.squares];

      if (calculateWinner(mySquares) || mySquares[i]) {
        return;
      }

      mySquares[i] = xIsNext ? 'X' : 'O';

      setHistory(history.concat([{
          squares: mySquares,
      }]));
      setStepNumber(history.length);
      setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
      setStepNumber(step);
      setXIsNext((step % 2) === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const status = '';

    useEffect(() => {
      current = history[stepNumber];
      winner = calculateWinner(current.squares);
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }, [stepNumber])

    return (
      <div className="game">
        <div className="game-info">
          <div>{ status }</div>
          <ol>
            { history.map((step, move) => (
              <i key={move}>
                <button onClick={() => this.jumpTo(move) }>
                  Go to {move ? 'move #' + move : 'game start'}
                </button>
              </i>
            ))}
          </ol> 
        </div>
        <div className="game-board">
          <Board 
            // squares und onClick sind props, die in Game deklariert und an Board weitergegeben wurden
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    )
}
export default Game;