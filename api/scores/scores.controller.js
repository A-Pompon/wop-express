const scoreService = require("./scores.service");
const jwt = require("jsonwebtoken");

class ScoreController {
  async getAllScores(req, res, next) {
    try {
      const scores = await scoreService.getAllScores();
      res.status(200).json(scores);
    } catch (error) {
      next(error);
    }
  }

  async getMyScoreById(req, res, next) {
    try {
      const userId = req.userId;
      const score = await scoreService.getMyScoreById(userId);
      res.status(200).json(score);
    } catch (error) {
      next(error);
    }
  }

  async getScoreById(req, res, next) {
    try {
      const userId = req.params.id;
      console.log("userId", userId);
      const score = await scoreService.getUserScore(userId);
      console.log("score", score);
      res.status(200).json(score);
    } catch (error) {
      next(error);
    }
  }

  // A REVOIR
  // async getScoreById(req, res, next) {
  //   try {
  //     const userId = req.userId;
  //     const scoreId = req.params.id;
  //     console.log("scoreId", scoreId);
  //     console.log("userId", userId);
  //     const score = await scoreService.getScoreById(scoreId, userId);
  //     res.status(200).json(score);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async gameVictories(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const updatedScore = await scoreService.updateScore(userId, gameId, {
        $inc: { victories: 1 },
      });
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async gameDefeates(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const updatedScore = await scoreService.updateScore(userId, gameId, {
        $inc: { defeates: 1 },
      });
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async resultGame(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const point = req.params.point;
      const updatedScore = await scoreService.updateScore(userId, gameId, {
        $inc: { points: point },
      });
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async winLevelOne(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const points = 3;
      const updatedScore = await scoreService.updateScoreStatic(
        userId,
        gameId,
        points
      );
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async looseLevelOne(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const points = -1;
      const updatedScore = await scoreService.updateScoreStatic(
        userId,
        gameId,
        points
      );
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async winLevelTwo(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const points = 5;
      const updatedScore = await scoreService.updateScoreStatic(
        userId,
        gameId,
        points
      );
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async looseLevelTwo(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const points = -3;
      const updatedScore = await scoreService.updateScoreStatic(
        userId,
        gameId,
        points
      );
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async winLevelThree(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const points = 9;
      const updatedScore = await scoreService.updateScoreStatic(
        userId,
        gameId,
        points
      );
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }

  async looseLevelThree(req, res, next) {
    try {
      const userId = req.userId;
      const gameId = req.params.id;
      const points = -7;
      const updatedScore = await scoreService.updateScoreStatic(
        userId,
        gameId,
        points
      );
      res.send(updatedScore);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ScoreController();
