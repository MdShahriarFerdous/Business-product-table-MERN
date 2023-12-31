//Config Lib import and configured
require("dotenv").config();
const ServerPort = process.env.SERVER_PORT;
const MongoDBConnectionURL = process.env.MONGO_DB_CONNECTION;

module.exports = { ServerPort, MongoDBConnectionURL };
