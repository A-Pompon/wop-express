const Score = require("./scores.model");
const User = require("../users/users.model");
const jwt = require("jsonwebtoken");

class ScoreService {
  async getAllScores() {
    return Score.find().sort({ points: -1 }).populate("user_id", "name race");
  }

  async getMyScoreById(userId) {
    return Score.findOne({ user_id: userId }).populate("user_id", "name race");
  }

  async getScoreById(userId) {
    return Score.findById({ user_id: userId }).populate("user_id", "name race");
  }

  async getUserScore(userId) {
    const user = await User.findById(userId, "name race friends");

    // Vérifier si l'utilisateur existe
    if (!user) {
      throw new Error("User not found");
    }

    // Récupérer le score de l'utilisateur
    const score = await Score.findOne({ user_id: userId });

    // Vérifier si le score existe
    if (!score) {
      throw new Error("Score not found for the user");
    }

    // Ajouter le nom et la race de l'utilisateur au score
    const userScore = {
      name: user.name,
      race: user.race,
      friends: user.friends,
      victories: score.victories,
      defeates: score.defeates,
      points: score.points,
    };
    console.log("userScore", userScore);
    return userScore;
  }

  // async getScoreById(scoreId, userId) {
  //   const score = await Score.findById(scoreId).populate(
  //     "user_id",
  //     "name race"
  //   );
  //   const friends = await Friend.findOne({ user_id: userId }).populate(
  //     "friends_id",
  //     "name race"
  //   );
  //   const scoreWithFriends = score.toObject();
  //   scoreWithFriends.friends = friends
  //     ? friends.friends_id
  //       ? friends.friends_id
  //       : []
  //     : [];
  //   return scoreWithFriends;
  // }

  async updateScore(userId, gameId, updateData) {
    console.log(userId, gameId, updateData);
    return Score.findOneAndUpdate(
      { user_id: userId, game_id: gameId },
      updateData,
      {
        new: true,
      }
    );
  }

  async updateScoreStatic(userId, gameId, points) {
    try {
      console.log(userId, gameId);
      const updatedScore = await Score.findOneAndUpdate(
        { user_id: userId, game_id: gameId },
        { $inc: { points: points } },
        { new: true }
      );
      console.log("updatedScore", updatedScore);
      return updatedScore;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ScoreService();
