const repo = require("./../database/taskRepository");

class TaskService {
	async findAll(pageable, userId) {
		return await repo.selectAll(pageable, userId);
	}
}

const service = new TaskService();
module.exports = service;
