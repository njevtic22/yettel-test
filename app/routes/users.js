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
	const dtoResult = toDtoArray(result);
	res.status(200).json(dtoResult);
});

// Route for fetching user by id
router.get(`${apiPrefix}/:id`, (req, res) => {
	res.status(200).json({ param: "fetched" });
});

// Route for updating existing user
router.put(`${apiPrefix}/:id`, (req, res) => {
	res.status(200).json({ param: "updated" });
});

// Creates dto object which omits data that client should not see
function toDto(user) {
	const { password, ...dto } = user;
	return dto;
}

// Creates array of dto objects
function toDtoArray(users) {
	let dtos = [];
	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		dtos.push(toDto(user));
	}
	return dtos;
}

module.exports = router;
