const ApiError = require("./../exceptions/ApiError");

function getPageable(req) {
	const page = req.query.page ? req.query.page : 0;
	const size = req.query.size ? req.query.size : 20;

	if (Boolean(req.query.sort) && typeof req.query.sort != "string") {
		throw new ApiError(`Can not sort by multiple fields`, 400);
	}

	const sort = req.query.sort ? req.query.sort : "id,asc";
	const sortSplit = sort.split(",");
	return {
		page,
		size,
		sort: sortSplit[0],
		order: sortSplit[1],
	};
}

module.exports = { getPageable };
