const express = require("express");
const router = express.Router();

const apiPrefix = "/api/tasks";

const service = require("./../services/taskService");

const { getPageable } = require("./../util/queryParamUtil");
const { toDtoPage } = require("./../util/dtoMapper");
const { validateAddTask } = require("../util/nullValidator");

// Route for adding new task
router.post(apiPrefix, async (req, res) => {
	validateAddTask(req.body);

	const added = await service.add(req.body);

	res.setHeader("location", `${apiPrefix}/${added.id}`);
	res.sendStatus(201);
});

// Route for fetching all tasks
router.get(apiPrefix, async (req, res) => {
	const pageable = getPageable(req);

	const result = await service.findAll(pageable, req.query.userId);
	// const dtoResult = toDtoPage(result, toDto);
	res.status(200).json(result);
});

// function toDto(user) {
// 	const { body, ...dto } = user;
// 	return dto;
// }

module.exports = router;
