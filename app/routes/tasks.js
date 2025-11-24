const express = require("express");
const router = express.Router();

const apiPrefix = "/api/tasks";

const service = require("./../services/taskService");

const { getPageable } = require("./../util/queryParamUtil");
const { toDtoPage } = require("./../util/dtoMapper");

// Route for fetching all tasks
router.get(apiPrefix, async (req, res) => {
	const pageable = getPageable(req);

	const result = await service.findAll(pageable, req.query.userId);
	res.status(200).json(result);
});

module.exports = router;
