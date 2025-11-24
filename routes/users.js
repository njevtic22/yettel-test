const express = require("express");
const router = express.Router();

const apiPrefix = "/api/users";

const service = require("./../services/userService");

const { validateUser } = require("./../util/nullValidator");

// Route for adding new user
router.post(apiPrefix, async (req, res) => {
	validateUser(req.body);

	const added = await service.add(req.body);

	res.setHeader("location", `${apiPrefix}/${added.id}`);
	res.sendStatus(201);
});

// Route for fetching all users
router.get(apiPrefix, async (req, res) => {
	const result = await service.findAll();
	res.status(200).json(result);
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
