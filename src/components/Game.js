import React, { Component } from 'react';
import Board from './Board';
import calculateWinner from '../helper/calculate.js';

// Game Parent-Component - Board Child-Component
class Game extends Component {
    // Um die Werte in verschiedenen Components zu ändern, brauchen wir 
    // diese Änderungen in dem gleichen Parent-Component zu definieren. 
    // "Lifting State Up" props können wir benutzen von einem Component zu 
    // dem anderen, weil sie in Parent deklariet wurde
    constructor(props) { 
        super(props);
        // this.state = bekommt ein Objekt mit den folgenden Attributen zugewiesen: 
        // {   history:  , stepNumber:   ,  xIsNext:   };
        this.state = {
            history : [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0, 
            xIsNext: true
        };
    }
    
    // handleClick steuert den Klick auf Sqaure und gibt jedes Square einen
    // neuen Wert mit X
    handleClick(i) {
        // mySquares definieren und alle Squares in einer Variable sammeln, um nachher die 
        // squares-inhalte vom Board zu updaten. Das machte die Sache
        // einfacher den Gewinner vom Board festzustellen
        // mySquares ist eine Kopie von den neuen updateten Werten von squares
        // const mySquares = [...this.state.squares];

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        console.log(history);
        const current = history[history.length - 1];
        const mySquares = [...current.squares];

        if (calculateWinner(mySquares) || mySquares[i]) {
            return;
        } 
        // mySquares an postion [i] zu 'X' ändern
        // xIsNext hat beim Klicken einmal den Wert X und einmal den Wert O
        mySquares[i] = this.state.xIsNext ? 'X' : 'O';
        // setState heißt: alte werte von squares werden mit neuen 
        // Werten vom mySquares updatet. Wir müssen auch den Wert von O updaten
        // das ist durch xIsNext: Wenn das !nicht X, dann heißt das O
        this.setState({
            // ändert das Array nicht, sondern die neue Werte beim rendern werden hinzugefügt
            history: history.concat([{
                squares: mySquares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    // Der Schritt beim Klicken wurde updatet
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
        const history = this.state.history;
        // render NICHT den letzten Schritt, sondern der aktuelle Schritt "stepNumber"
        // const current = history[history.length - 1];
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
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
        );
    }
}
export default Game;