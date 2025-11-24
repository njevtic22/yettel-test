const bcrypt = require("bcrypt");
const rounds = 10;

const ApiError = require("./../exceptions/ApiError");

const repo = require("./../database/userRepository");

class UserService {
	constructor() {
		console.log("Constructor");
	}

	async add(newUser) {
		await this.#validateEmail(newUser.email);
		this.#validateUsername(newUser.username);

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

	async #validateEmail(email) {
		// TODO: repo.existsByEmail(email)
		if (await repo.existsByEmail(email)) {
			throw new ApiError(`Email: ${email} is taken`, 400);
		}
	}

	#validateUsername(username) {
		// TODO: repo.existsByUsername(username)
		console.log("Validating username");
	}
}

const service = new UserService();
module.exports = service;
