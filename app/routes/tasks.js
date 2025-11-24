const express = require("express");
const router = express.Router();

const apiPrefix = "/api/tasks";

const service = require("./../services/taskService");

const { getPageable } = require("./../util/queryParamUtil");
const { toDtoPage } = require("./../util/dtoMapper");
const { validateTask } = require("../util/nullValidator");

// Route for adding new task
router.post(apiPrefix, async (req, res) => {
	validateTask(req.body);

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

// Route for fetching task by id
router.get(`${apiPrefix}/:id`, async (req, res) => {
	const result = await service.findById(req.params.id);
	res.status(200).json(result);
});

// Route for updating task by id
router.put(`${apiPrefix}/:id`, async (req, res) => {
	validateTask(req.body, (keys = ["body"]));

	await service.updateById(req.params.id, req.body);

	res.sendStatus(200);
});

// function toDto(user) {
// 	const { body, ...dto } = user;
// 	return dto;
// }

module.exports = router;
