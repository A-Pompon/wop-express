require("dotenv").config();
const { createAgent } = require("@forestadmin/agent");
const {
  createMongooseDataSource,
} = require("@forestadmin/datasource-mongoose");
const { db } = require("../config/db");

const forestSetup = (app) => {
  createAgent({
    // Security tokens
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,

    // Make sure to set NODE_ENV to 'production' when you deploy your project
    isProduction: process.env.NODE_ENV === "production",
  })
    .addDataSource(createMongooseDataSource(db, { flattenMode: "auto" }))
    .mountOnStandaloneServer(Number(process.env.APPLICATION_PORT))
    .start()
    .catch((error) => {
      console.error(
        "\x1b[31merror:\x1b[0m Forest Admin agent failed to start\n"
      );
      console.error("");
      console.error(error.stack);
      process.exit(1);
    });
};

module.exports = forestSetup;
