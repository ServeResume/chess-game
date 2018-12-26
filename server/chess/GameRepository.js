class GameRepostiory {
  constructor() {
    this.games = [];
  }

  getById(id) {
    return this.games.find(game => game.getId() === id);
  }

  save(game) {
    this.games.push(game);
  }
}

module.exports = GameRepostiory;
