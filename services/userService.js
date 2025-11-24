const bcrypt = require("bcrypt");
const rounds = 10;

class UserService {
	constructor() {
		console.log("Constructor");
	}

	async add(newUser) {
		console.log("Adding user: " + newUser.firstName);

		const hashed = await bcrypt.hash(newUser.password, rounds);
		return hashed;
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
