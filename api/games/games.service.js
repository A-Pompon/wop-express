const Game = require("./games.model");

class GamesService {
  async getGameByName(nameGame) {
    return Game.findOne({ nameGame });
  }
}

module.exports = new GamesService();
