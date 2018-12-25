import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChessRook,
  faChessBishop,
  faChessKnight,
  faChessQueen,
  faChessKing,
  faChessPawn,
} from '@fortawesome/free-solid-svg-icons';

const mapPieceNameToIcon = {
  'rook': faChessRook,
  'bishop': faChessBishop,
  'knight': faChessKnight,
  'queen': faChessQueen,
  'king': faChessKing,
  'pawn': faChessPawn,
}

const getIconSize = (boxWidth) => [
  [0, 35, '1x'],
  [35, 55, '2x'],
  [55, 80, '3x'],
  [80, 110, '4x'],
  [110, 150, '5x'],
  [150, Infinity, '6x'],
].find(
  ([ fromValue, toValue ]) => boxWidth > fromValue && boxWidth <= toValue
)[2];

const ChessPiece = ({ boxWidth, color, pieceName }) => (
  <FontAwesomeIcon
    color={color}
    size={getIconSize(boxWidth)}
    icon={mapPieceNameToIcon[pieceName]}
  />
);

ChessPiece.propTypes = {
  boxWidth: PropTypes.number.isRequired,
  pieceName: PropTypes.oneOf([
    'rook',
    'bishop',
    'knight',
    'queen',
    'king',
    'pawn',
  ]).isRequired,
  color: PropTypes.oneOf([
    'black',
    'white',
  ]).isRequired,
};

export default ChessPiece;
