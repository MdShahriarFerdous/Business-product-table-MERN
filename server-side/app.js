const createError = require("http-errors");
const express = require("express");
const app = express();
const router = require("./src/routes/productRoute");

//DevDependency Lib import
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp"); // to protect against HTTP Parameter Pollution attacks
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize"); //which sanitizes user-supplied data to prevent MongoDB Operator Injection.

// Middlewares implement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(hpp());
app.use(morgan("dev"));

// Request Rate Limit
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 50, // limit each IP to 50 requests per windowMs
	message: "Too many requests from this IP",
});
app.use(limiter);

//for single files in routes folder
app.use("/api/v1", router);

//client error
app.use((req, res, next) => {
	next(createError(404, "Route not Found"));
});

//server error
app.use((err, req, res, next) => {
	return res.status(err.status || 500).json({
		success: false,
		message: err.message,
	});
});

module.exports = app;
