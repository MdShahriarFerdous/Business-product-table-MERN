// Database Lib import
const mongoose = require("mongoose");
const { MongoDBConnectionURL } = require("../../secret");

const databaseConnection = () => {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(MongoDBConnectionURL)
		.then(() => {
			console.log("MongoDB connected!!");
		})
		.catch((err) => {
			console.log("Failed to connect to MongoDB", err.message);
		});
};
module.exports = databaseConnection;
