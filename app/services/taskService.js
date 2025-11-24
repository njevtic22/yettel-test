const ApiError = require("../exceptions/ApiError");
const repo = require("./../database/taskRepository");

const userService = require("./userService");

class TaskService {
	async add(newTask) {
		this.#validateBody(newTask.body);

		const author = await userService.findById(newTask.userId);

		const toAdd = {
			created: new Date().toISOString(),
			userId: author.id,
			body: newTask.body,
		};
		const added = await repo.insert(toAdd);

		return added;
	}

	async findAll(pageable, userId) {
		return await repo.selectAll(pageable, userId);
	}

	#validateBody(body) {
		if (body.length > 1000) {
			throw new ApiError(
				`Task body can not be longer than ${1000} characters`,
				400
			);
		}
	}
}

const service = new TaskService();
module.exports = service;
