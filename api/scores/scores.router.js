const express = require("express");
const scoreController = require("./scores.controller");
const router = express.Router();

router.get("/", scoreController.getAllScores);
router.get("/profil", scoreController.getMyScoreById);
router.get("/add/victories/:id", scoreController.gameVictories);
router.get("/add/defeates/:id", scoreController.gameDefeates);

// router.get("/update/points/:id/:point", scoreController.resultGame);

router.get("/win1/:id", scoreController.winLevelOne);
router.get("/loose1/:id", scoreController.looseLevelOne);
router.get("/win2/:id", scoreController.winLevelTwo);
router.get("/loose2/:id", scoreController.looseLevelTwo);
router.get("/win3/:id", scoreController.winLevelThree);
router.get("/loose3/:id", scoreController.looseLevelThree);

router.get("/:id", scoreController.getScoreById);

module.exports = router;
