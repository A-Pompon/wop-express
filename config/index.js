require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  secretJwtToken: process.env.ACCESS_TOKEN_SECRET,
};
