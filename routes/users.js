const express = require("express");
const router = express.Router();

const apiPrefix = "/users";

const service = require("./../services/userService");

// Route for adding new user
router.post(apiPrefix, async (req, res) => {
	const password = await service.add(req.body);
	res.setHeader("location", "added");
	res.setHeader("password", password);
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
