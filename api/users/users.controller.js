const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const usersService = require("./users.service");
// const articlesService = require("../articles/articles.service");

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await usersService.get(id);
      if (!user) {
        throw new NotFoundError();
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const user = await usersService.create(req.body);
      user.password = undefined;
      // req.io.emit("user:create", user);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  // async updateRace(req, res, next) {
  //   try {
  //     const id = req.params.id;
  //     const race = req.body.race;
  //     console.log("race", race);
  //     const userModified = await usersService.updateRace(id, race);
  //     userModified.password = undefined;
  //     console.log("userModified", userModified);
  //     res.json(userModified);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async getMyProfil(req, res, next) {
    try {
      console.log("req.userId", req.userId);
      const userId = req.userId;
      const me = await usersService.getMyProfil(userId);
      console.log("me", me);
      res.status(200).json(me);
    } catch (error) {
      next(error);
    }
  }

  async getFriendsWithScores(req, res, next) {
    try {
      const userId = req.userId;
      const friendsWithScores = await usersService.getFriendsWithScores(userId);
      res.json(friendsWithScores);
    } catch (error) {
      next(error);
    }
  }

  async updateRace(req, res, next) {
    try {
      const userId = req.userId;
      console.log("userId", userId);
      const race = req.body.race;
      console.log("race", race);
      const userModified = await usersService.updateUser(userId, {
        race: race,
      });
      // userModified.password = undefined;
      console.log("userModified", userModified);
      res.json(userModified);
    } catch (err) {
      console.log("err", err);
      next(err);
    }
  }

  async updateName(req, res, next) {
    try {
      const userId = req.userId;
      console.log("userId", userId);
      const name = req.body.name;
      console.log("race", name);
      const userModified = await usersService.updateUser(userId, {
        name: name,
      });
      // userModified.password = undefined;
      console.log("userModified", userModified);
      res.json(userModified);
    } catch (err) {
      console.log("err", err);
      next(err);
    }
  }

  async addFriend(req, res, next) {
    try {
      const { friendId } = req.body;
      const userId = req.userId;
      const user = await usersService.addFriend(userId, friendId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteFriend(req, res, next) {
    try {
      const { friendId } = req.body;
      const userId = req.userId;
      const user = await usersService.deleteFriend(userId, friendId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.userId;
      await usersService.deleteUser(id);
      // req.io.emit("user:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  // async login(req, res, next) {
  //   try {
  //     const { email, password } = req.body;
  //     const userId = await usersService.checkPasswordUser(email, password);
  //     console.log(email + " " + password + " " + userId);
  //     // RETURN FALSE PCQ ON A PAS FAIT HASHAGE DE MOT DE PASSE
  //     if (!userId) {
  //       throw new UnauthorizedError();
  //     }
  //     const token = jwt.sign({ userId }, config.secretJwtToken, {
  //       expiresIn: "3d",
  //     });
  //     res.json({
  //       token,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

module.exports = new UsersController();
