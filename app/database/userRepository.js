const { pool } = require("./config");

const tableName = "users";

class userRepository {
	constructor() {
		console.log("Constructor");
	}

	async insert(newUser) {
		let res = null;
		let conn = null;

		const count = await this.count();
		try {
			conn = await pool.connect();

			const insertQuery = toSqlInsert(count + 1, newUser);

			res = await conn.query(insertQuery);
		} catch (err) {
			console.log("Error quering database with insert operation");
			console.log(err);
		} finally {
			conn.release();
		}

		return res;
	}

	async selectAll() {
		let res = null;
		let conn = null;
		try {
			conn = await pool.connect();

			res = await conn.query(`SELECT * FROM ${tableName}`);
		} catch (err) {
			console.log("Error quering database with select all operation");
			console.log(err);
		} finally {
			conn.release();
		}
		return res.rows;
	}

	async count() {
		let count = null;
		let conn = null;

		try {
			conn = await pool.connect();

			const queryResult = await conn.query(
				`SELECT count(*) FROM ${tableName}`
			);
			count = Number(queryResult.rows[0].count);
		} catch (err) {
			console.log("Error quering database with count operation");
			console.log(err);
		} finally {
			conn.release();
		}

		return count;
	}
}

function toSqlInsert(id, user) {
	return `INSERT INTO ${tableName} (id, "firstName", "lastName", username, email, password, role) 
    VALUES (${id}, '${user.firstName}', '${user.lastName}', '${user.username}', '${user.email}', '${user.password}', '${user.role}');`;
}

const repo = new userRepository();
module.exports = repo;
