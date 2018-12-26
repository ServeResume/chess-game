const range = require('lodash/range');
const Game = require('./Game');

class StandardGameBuilder {
  build(gameId) {
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

    return new Game(gameId, pieces);
  }
}

module.exports = StandardGameBuilder;
