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

  isItLegalToMovePiece(fromPosition, toPosition, playerId) {
    const fromPiece = this.pieces[fromPosition.x][fromPosition.y];
    if (this.lastMoveColor === this.getPlayerColor(playerId)) {
      return false;
    }

    if (fromPiece.color !== this.getPlayerColor(playerId)) {
      return false;
    }

    return true;
  }

  movePiece(fromPosition, toPosition, playerId) {
    if (!this.isItLegalToMovePiece(fromPosition, toPosition, playerId)) {
      throw new Error('Not legal to move the piece');
    }

    this.pieces[toPosition.x][toPosition.y] = this.pieces[fromPosition.x][fromPosition.y];
    this.pieces[fromPosition.x][fromPosition.y] = null;
    this.lastMoveColor = this.getPlayerColor(playerId);
  }
}

module.exports = Game;
