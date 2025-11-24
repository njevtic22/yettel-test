const express = require("express");
const router = express.Router();

const apiPrefix = "/users";

// Route for adding new user
router.post(apiPrefix, (req, res) => {
	res.setHeader("location", "added");
	res.sendStatus(201);
});

// Route for fetching all users
router.get(apiPrefix, (req, res) => {
	res.status(200).json({ param: req.query.test });
});

// Route for fetching user by id
router.get(`${apiPrefix}/:id`, (req, res) => {
	res.status(200).json({ param: "fetched" });
});

// Route for updating existing user
router.put(`${apiPrefix}/:id`, (req, res) => {
	res.status(200).json({ param: "updated" });
});
module.exports = router;
