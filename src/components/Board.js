import React, { Component } from 'react';
import Square from './Square';


// Board Parent-Component - Square Child-Component
class Board extends Component {
  /*
  // Lifting State Up (vom Child zum Parent mit Csr() )
  constructor(props) {
      super(props);
      this.state = {
          squares: Array(9).fill(null),
          // Welcher Spieler ist jetzt dran, und diesen 
          // Wert wird als bool in xIsNext gespeichert
          xIsNext: true,
      };
  }
  */

  render() {
    return (
      <>
        { Array(9).fill('').map((e, i) => (
          <Square
            key={i}
            // durch props werden die Daten vom Parent-Com "Board" weitergegeben
            value={this.props.squares[i]}
            // this.handleClick steuert die Eingaben vom User beim Klicken auf Square 
            // onClick() werden wir in Square aufrufen einfach mit dem Name onClick()
            onClick={() => this.props.onClick(i)}
          />
        ))}
      </>
    );
  }
}
export default Board;