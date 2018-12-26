class Game {
  constructor(id, pieces) {
    this.id = id;
    this.pieces = pieces;
    this.playerIds = [];
    this.lastMoveColor = 'black';
  }

  addPlayerId(playerId) {
    if (this.playerIds.length > 1) {
      throw new Error('Two players already connected');
    }
    this.playerIds.push(playerId);
  }

  hasPlayer(playerId) {
    return this.playerIds.some(id => id === playerId);
  }

  getPlayerColor(playerId) {
    return this.playerIds.indexOf(playerId) === 0 ? 'white' : 'black';
  }

  getId() {
    return this.id;
  }

  getPieces() {
    return this.pieces;
  }

  movePiece(fromPosition, toPosition) {
    //
  }
}

module.exports = Game;
