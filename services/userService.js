const bcrypt = require("bcrypt");
const rounds = 10;

const repo = require("./../database/userRepository");

class UserService {
	constructor() {
		console.log("Constructor");
	}

	async add(newUser) {
		this.#validateEmail(newUser.email);
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

	async findAll() {
		return await repo.selectAll();
	}

	#validateEmail(email) {
		// TODO: repo.existsByEmail(email)
		console.log("Validating email");
	}

	#validateUsername(username) {
		// TODO: repo.existsByUsername(username)
		console.log("Validating username");
	}
}

const service = new UserService();
module.exports = service;
