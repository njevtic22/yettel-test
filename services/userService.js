const bcrypt = require("bcrypt");
const rounds = 10;

const repo = require("./../database/userRepository");

class UserService {
	constructor() {
		console.log("Constructor");
	}

	async add(newUser) {
		console.log("Adding user: " + newUser.firstName);

		repo.insert(newUser);

		const hashed = await bcrypt.hash(newUser.password, rounds);
		return hashed;
	}

	async findAll() {
		return await repo.selectAll();
	}

	#validateEmail(email) {
		// repo.existsByEmail(email)
		console.log("Validating email");
	}

	#validateUsername(username) {
		// repo.existsByUsername(username)
		console.log("Validating username");
	}
}

const service = new UserService();
module.exports = service;
