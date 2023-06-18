const ApplicationLogger = require("./../services/Logger");

const mongoose = require("mongoose");
const { config } = require(".");



async function connectToDatabase() {
  // strict schema , no additional fields will be added
  mongoose.set("strictQuery", true);
  return mongoose
    .connect(config.DB_URL)
    .then((value) => {
      ApplicationLogger.log(`Connected to mongodb url ${config.DB_URL}`);
    })
    .catch((err) => {
      ApplicationLogger.error("Unable to connect to Mongodb ", err?.message);
    });
}

module.exports = { connectToDatabase };
