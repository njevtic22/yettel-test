const repo = require("./../database/taskRepository");

class TaskService {
	async findAll(pageable) {
		return await repo.selectAll(pageable);
	}
}

const service = new TaskService();
module.exports = service;
