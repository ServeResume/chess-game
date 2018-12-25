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
          />
        )}
      </SizeMe>
    );
  }
}

export default ChessGame;
