const http = require("http");
const express = require("express");
const app = express();

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
app.listen(3000);

// Registering all routes related to user
const userRouter = require("./routes/users");
app.use(userRouter);
