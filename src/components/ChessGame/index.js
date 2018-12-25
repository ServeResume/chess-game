import React from 'react';
import { SizeMe } from 'react-sizeme';
import range from 'lodash/range';
import ChessBoard from '../ChessBoard';
import ChessPiece from '../ChessPiece';

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

class ChessGame extends React.Component {
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

  renderAtPosition = (wrapperWidth, { x, y }) => {
    const piece = pieces[x][y];

    if (!piece) {
      return null;
    }

    const { name, color } = piece;

    return (
      <ChessPiece
        pieceName={name}
        color={color}
        boxWidth={wrapperWidth / 8}
      />
    );
  }

  render() {
    return (
      <SizeMe>
        {({ size }) => (
          <ChessBoard
            reverseBoard={currentPlayer === 'black'}
            primaryColor={'#EEEED5'}
            secondaryColor={'#7D955D'}
            wrapperWidth={size.width || -1}
            renderAtPosition={(...args) =>
              this.renderAtPosition(size.width, ...args)}
            onPositionClick={this.onPositionClick}
            isPositionActive={this.isPositionActive}
            activeColor={'#BDCA5F'}
          />
        )}
      </SizeMe>
    );
  }
}

export default ChessGame;
