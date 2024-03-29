const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
  victories: { type: Number, default: 0 },
  defeates: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  game_id: { type: Schema.Types.ObjectId, ref: "Game" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Score", scoreSchema);
