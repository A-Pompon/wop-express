const config = require("./index");
const mongoose = require("mongoose");
const { userSchema } = require("../api/users/users.model");
const { gameSchema } = require("../api/games/games.model");
const { scoreSchema } = require("../api/scores/scores.model");

mongoose.connect(config.mongoUri);

const db = mongoose.connection;

db.model("User", userSchema);
db.model("Game", gameSchema);
db.model("Score", scoreSchema);

module.exports = { db };
