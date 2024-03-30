const User = require("./users.model");
const Score = require("../scores/scores.model");
const bcrypt = require("bcrypt");

class UserService {
  getAll() {
    return User.find({}, "-password");
  }
  get(id) {
    return User.findById(id, "-password");
  }
  create(data) {
    const user = new User(data);
    return user.save();
  }

  getMyProfil(userId) {
    return User.findById(userId, "-password");
  }

  updateUser(userId, updateData) {
    return User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      select: "-password",
    });
  }

  // async getFriendsWithScores(userId) {
  //   const user = await this.getMyProfil(userId);
  //   console.log("user", user);
  //   const friendsWithScores = [];

  //   for (const friendId of user.friends) {
  //     const friend = await User.findById(friendId);
  //     console.log("friend", friend);
  //     const friendScore = await Score.findById({ user_id: friendId });
  //     const friendData = {
  //       _id: friend._id,
  //       name: friend.name,
  //       race: friend.race,
  //       score: friendScore || { victories: 0, defeats: 0, points: 0 },
  //     };
  //     friendsWithScores.push(friendData);
  //   }

  //   return friendsWithScores;
  // }

  async getFriendsWithScores(userId) {
    const user = await this.getMyProfil(userId);

    const friendsWithScores = [];

    for (const friendId of user.friends) {
      // Vérifier si l'ami existe dans la base de données
      const friend = await User.findById(friendId);
      if (friend) {
        // Si l'ami existe, récupérer ses informations et son score
        const friendScore = await Score.findOne({ user_id: friendId });
        const friendData = {
          _id: friend._id,
          name: friend.name,
          race: friend.race,
          score: friendScore || { victories: 0, defeats: 0, points: 0 },
        };
        friendsWithScores.push(friendData);
      } else {
        console.log(`Friend with ID ${friendId} not found in the database.`);
      }
    }

    return friendsWithScores;
  }

  addFriend(userId, friendId) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );
  }

  deleteFriend(userId, friendId) {
    return User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
  }

  async deleteUser(id) {
    await User.findOneAndDelete({ _id: id });
  }

  // await User.updateMany({ friends: id }, { $pull: { friends: id } });

  // async deleteUser(id) {
  //   try {
  //     // Supprimer l'utilisateur
  //     await User.findOneAndDelete({ _id: id });

  //     console.log(`User with ID ${id} deleted successfully.`);

  //     // Mettre à jour les autres utilisateurs pour supprimer l'ID de l'utilisateur supprimé de leur liste d'amis
  //     const updateResult = await User.updateMany(
  //       { friends: { $eq: id } }, // Utilisez $eq pour une correspondance stricte
  //       { $pull: { friends: id.trim() } } // Assurez-vous que l'ID correspond exactement, sans espaces blancs
  //     );
  //     // console.log("frinds", friends);
  //     console.log("id", id);
  //     console.log("id.trim()", id.trim());
  //     console.log(updateResult); // Log du résultat de la mise à jour

  //     console.log(`Friends updated successfully.`);
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     throw error;
  //   }
  // }
}

module.exports = new UserService();
