const express = require("express");
const router = express.Router();
const gamesController = require("./games.controller");

router.get("/ShiFuMi", gamesController.getGameByName);

module.exports = router;
