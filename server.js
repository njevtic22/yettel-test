const http = require("http");
const express = require("express");
const app = express();

const { closePool } = require("./database/config");
const dbInit = require("./database/init");
dbInit();

// Middleware for logging all incoming requests and outgoing responses
function logger(req, res, next) {
	console.log(
		`Request:  ${req.method} ${req.originalUrl} HTTP/${req.httpVersion}`
	);

	res.on("finish", () => {
		console.log(
			`Response: HTTP/${req.httpVersion} ${res.statusCode} ${
				http.STATUS_CODES[res.statusCode]
			}`
		);
	});

	next();
}

app.use(logger);
app.use(express.json());
const server = app.listen(3000);

// Registering all routes related to user
const userRouter = require("./routes/users");
app.use(userRouter);

// Cleanup on shutdown
function shutdown() {
	console.log("Shutting down...");

	const forceId = setTimeout(() => {
		console.log("Forced shut down");
		process.exit(1);
	}, 1000);

	server.close(() => {
		closePool();
		console.log("Shut down...");

		clearTimeout(forceId);
		process.exit(0);
	});
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Error handling
app.use((err, req, res, next) => {
	if (err.isCustom) {
		res.status(err.statusCode).json({
			message: err.message,
		});
	} else {
		console.error(err);
		res.status(500).json({
			message: err.message,
		});
	}
});
