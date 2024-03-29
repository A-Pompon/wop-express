const express = require("express");
const usersController = require("./users.controller");
const router = express.Router();

router.get("/", usersController.getAll);
// router.get("/:id", usersController.getById); // BLOQUE LES REQUETES DU BAS
router.post("/", usersController.create);

router.get("/profil", usersController.getMyProfil);

router.patch("/race", usersController.updateRace);
router.patch("/name", usersController.updateName);

router.get("/friends/scores", usersController.getFriendsWithScores);

router.patch("/add/friend", usersController.addFriend);
router.patch("/delete/friend", usersController.deleteFriend);

router.delete("/delete/me", usersController.deleteUser); // POUR ADMIN UNIQUEMENT

module.exports = router;
