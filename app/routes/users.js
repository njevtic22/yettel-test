const express = require("express");
const router = express.Router();

const apiPrefix = "/api/users";

const service = require("./../services/userService");

const { validateUser } = require("./../util/nullValidator");
const { getPageable } = require("./../util/queryParamUtil");
const { toDtoPage } = require("./../util/dtoMapper");

// Route for adding new user
router.post(apiPrefix, async (req, res) => {
	validateUser(req.body);

	const added = await service.add(req.body);

	res.setHeader("location", `${apiPrefix}/${added.id}`);
	res.sendStatus(201);
});

// Route for fetching all users
router.get(apiPrefix, async (req, res) => {
	const pageable = getPageable(req);

	const result = await service.findAll(pageable);
	const dtoResult = toDtoPage(result, toDto);
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

module.exports = router;
