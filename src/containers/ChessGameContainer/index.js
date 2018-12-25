import React from 'react';
import range from 'lodash/range';
import ChessGame from '../../components/ChessGame';

const currentPlayer = 'white';
const pieces = [
  [
    { name: 'rook', color: 'black' },
    { name: 'knight', color: 'black' },
    { name: 'bishop', color: 'black' },
    { name: 'queen', color: 'black' },
    { name: 'king', color: 'black' },
    { name: 'bishop', color: 'black' },
    { name: 'knight', color: 'black' },
    { name: 'rook', color: 'black' },
  ],
  range(8).map(_ => ({ name: 'pawn', color: 'black' })),
  [],
  [],
  [],
  [],
  range(8).map(_ => ({ name: 'pawn', color: 'white' })),
  [
    { name: 'rook', color: 'white' },
    { name: 'knight', color: 'white' },
    { name: 'bishop', color: 'white' },
    { name: 'queen', color: 'white' },
    { name: 'king', color: 'white' },
    { name: 'bishop', color: 'white' },
    { name: 'knight', color: 'white' },
    { name: 'rook', color: 'white' },
  ],
];

class ChessGameContainer extends React.Component {
  state = {
    clickedPosition: null,
  };

  onPositionClick = ({ x, y }) => {
    const piece = pieces[x][y];

    if (this.equalPositions(this.state.clickedPosition, { x, y })) {
      this.setState({
        clickedPosition: null,
      })
    }
    else if(this.state.clickedPosition) {
      this.movePiece(this.state.clickedPosition, { x, y });
      this.setState({ clickedPosition: null });
    }
    else if(piece) {
      this.setState({
        clickedPosition: { x, y },
      });
    }
  }

  movePiece = (fromPosition, toPosition) => {
    console.log('Moving piece', fromPosition, toPosition);
  }

  equalPositions = (p1, p2) =>
    p1 && p2 && p1.x === p2.x && p1.y === p2.y;

  isPositionActive = (position) => {
    return this.equalPositions(this.state.clickedPosition, position);
  };

  render() {
    return (
      <ChessGame
        pieces={pieces}
        currentPlayer={currentPlayer}
        isPositionActive={this.isPositionActive}
        onPositionClick={this.onPositionClick}
      />
    );
  }
}

export default ChessGameContainer;
