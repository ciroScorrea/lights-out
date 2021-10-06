import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.5
  }
  constructor(props) {
    super(props);
    this.state = {hasWon: false, board: this.createBoard()}
    this.flipCellsAround = this.flipCellsAround.bind(this);
    // TODO: set initial state

  }
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = []
    for(let i = 0 ; i < this.props.nRows; i++){
      let lines = []
      for(let j = 0; j < this.props.nCols; j++){
        lines.push(Math.random() > this.props.chanceLightStartsOn ? true : false) ; 
      }
      board.push(lines);
    }
    const boardCheck = board.flat().filter(v => v.value === false);
    if (boardCheck.length === this.props.nCols * this.props.nRows)
    this.createBoard();
    
    // TODO: create array-of-arrays of true/false values 
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {nCols, nRows} = this.props;
    let board = this.state.board;
    let hasWon = this.state.hasWon;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y+1, x);
    flipCell(y-1, x);
    flipCell(y, x+1);
    flipCell(y, x-1);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    hasWon = !(board.flat().includes(true))
    this.setState({board, hasWon})    
  
  }


  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    // TODO
    // make table board

    return(
      <div>
        <h1 style={this.state.hasWon ? 
          {display:'inline-block'} : 
          {display:'none'}}>You Won!!!!!!!!!!!!!!!!!!!!!</h1>
          <div style={this.state.hasWon ? 
            {display:'none'} : 
            {display:'inline-block'}}>
            <div className="neon-orange">Lights</div>
            <div className="neon-blue">Out</div>
            <table className="Board">
                <tbody>
                    {this.state.board.map((x , l) =>
                      <tr key={l} >
                      {
                        x.map((y , c) => 
                          <Cell
                            key={l.toString()+'-'+c.toString()}
                            value={l.toString()+'-'+c.toString()}
                            isLit={y ? true : false }
                            flipCellsAroundMe = {this.flipCellsAround}
                          />
                          )  
                      }
                      </tr>
                      )}
                </tbody>
              </table>
          </div>
      </div>
    )
  }
}


export default Board;
