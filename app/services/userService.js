const bcrypt = require("bcrypt");
const rounds = 10;

const ApiError = require("./../exceptions/ApiError");

const repo = require("./../database/userRepository");

class UserService {
	async add(newUser) {
		await this.#validateEmail(newUser.email);
		await this.#validateUsername(newUser.username);

		const hashed = await bcrypt.hash(newUser.password, rounds);

		const toAdd = {
			...newUser,
			password: hashed,
			role: "BASIC",
		};
		const added = await repo.insert(toAdd);

		return added;
	}

	async findAll(pageable) {
		return await repo.selectAll(pageable);
	}

	async findById(id) {
		const found = await repo.selectById(id);
		if (!found) {
			throw new ApiError(`User with id: '${id}' not found`, 404);
		}

		return found;
	}

	async updateById(id, changes) {
		const existing = await this.findById(id);
		if (existing.email != changes.email) {
			await this.#validateEmail(changes.email);
		}
		if (existing.username != changes.username) {
			await this.#validateUsername(changes.username);
		}

		await repo.updateById(id, changes);
	}

	async #validateEmail(email) {
		if (await repo.existsByEmail(email)) {
			throw new ApiError(`Email: '${email}' is taken`, 400);
		}
	}

	async #validateUsername(username) {
		if (await repo.existsByUsername(username)) {
			throw new ApiError(`Username: '${username}' is taken`, 400);
		}
	}
}

const service = new UserService();
module.exports = service;
