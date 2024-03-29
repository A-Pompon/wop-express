const { app } = require("../server");
// const { server } = require("../server"); // POUR WEBSOCKETS
const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.mongoUri);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("Database connected");
});

app.listen(config.port, () => {
  console.log("App running");
  console.log(config.port);
});

// POUR WEBSOCKETS
// server.listen(config.port, () => {
//   console.log("App running");
// });
