const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  nameGame: { type: String, required: true },
});

module.exports = model("Game", gameSchema);
