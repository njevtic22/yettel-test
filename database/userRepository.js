const pool = require("./config");

class userRepository {
	constructor() {
		console.log("Constructor");
	}

	insert(newUser) {
		console.log("ADDING in REPOSITORY");
	}

	async selectAll() {
		let res = null;
		let conn = null;
		try {
			conn = await pool.connect();

			res = await conn.query("SELECT * FROM users");
		} catch (err) {
			console.log("Error quering database with select all");
		} finally {
			conn.release();
		}
		return res.rows;
	}
}

const repo = new userRepository();
module.exports = repo;
