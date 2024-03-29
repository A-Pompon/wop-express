const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const Game = require("../games/games.model");
const Score = require("../scores/scores.model");
const mongoose = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: /^[A-Za-z0-9_@&-]{3,25}$/,
      message: "Format name is not correct",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not correct`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    // NE FONCTIONNE PAS CAR ON ENREGISTE LE HASH DU PASSWORD
    // validate: {
    //   validator:
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$/,
    //   message: "Format password is not correct",
    // },
  },
  race: {
    type: String,
    enum: {
      values: ["GUERRIER", "SORCIER", "ESPION", "ALCHIMISTE", "ENCHANTEUR"],
      message:
        "The race must be GUERRIER, SORCIER, ESPION, ALCHIMISTE or ENCHANTEUR",
    },
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "member"],
      message: "{VALUE} unknown",
    },
    default: "admin", // CHANGER POUR LES MEMBRES
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date_creation: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
});

userSchema.pre("save", async function () {
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
});

// Apres la sauvegarde de l'utilisateur
userSchema.post("save", async function () {
  Game.find().then((games) => {
    games.forEach((game) => {
      const score = new Score({
        game_id: game._id,
        user_id: this._id,
      });
      score.save();
    });
  });
});

userSchema.post("findOneAndDelete", async function (doc, next) {
  console.log("POST DELETE USER");
  // const User = mongoose.model("User", userSchema);
  console.log("doc._id", doc._id);
  // Utilisation de Promise.all pour attendre que les deux opérations de suppression se terminent
  await Promise.all([
    Score.deleteMany({ user_id: doc._id }),
    // User.updateMany({ friends: doc._id }, { $pull: { friends: doc._id } }),
  ]);

  next();
});

module.exports = mongoose.model("User", userSchema);
