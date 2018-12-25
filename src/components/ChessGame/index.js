import React from 'react';
import PropTypes from 'prop-types';
import { SizeMe } from 'react-sizeme';
import ChessBoard from '../ChessBoard';
import ChessPiece from '../ChessPiece';

class ChessGame extends React.Component {
  renderAtPosition = (wrapperWidth, { x, y }) => {
    const piece = this.props.pieces[x][y];

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
    const {
      currentPlayer,
      onPositionClick,
      isPositionActive,
    } = this.props;
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
            onPositionClick={onPositionClick}
            isPositionActive={isPositionActive}
            activeColor={'#BDCA5F'}
          />
        )}
      </SizeMe>
    );
  }
}

ChessGame.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  onPositionClick: PropTypes.func.isRequired,
  isPositionActive: PropTypes.func.isRequired,
  pieces: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
};

export default ChessGame;
