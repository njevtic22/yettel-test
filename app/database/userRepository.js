const ApiError = require("../exceptions/ApiError");
const { pool } = require("./config");

const tableName = "users";

class userRepository {
	constructor() {
		console.log("Constructor");
	}

	async insert(newUser) {
		let res = null;
		let conn = null;

		const count = await this.count(`SELECT count(*) FROM ${tableName}`);
		try {
			conn = await pool.connect();

			const insertQuery = toSqlInsert(count + 1, newUser);

			res = await conn.query(insertQuery);
		} catch (err) {
			console.error("Error quering database with insert operation", err);
		} finally {
			conn?.release();
		}

		return res;
	}

	async selectAll(pageable) {
		let res = null;
		let count = null;
		let conn = null;
		try {
			conn = await pool.connect();

			res = await conn.query(
				`SELECT * FROM ${tableName} ORDER BY "${pageable.sort}" ${
					pageable.order
				} OFFSET ${pageable.page * pageable.size} ROWS LIMIT ${
					pageable.size
				}`
			);

			count = await this.count(`SELECT count(*) FROM ${tableName}`);
		} catch (err) {
			console.error(
				"Error quering database with select all operation",
				err
			);
		} finally {
			conn?.release();
		}

		const page = {
			totalPages: Math.ceil(count / pageable.size),
			totalElements: count,
			data: res.rows,
		};
		return page;
	}

	async selectById(id) {
		let res = null;
		let conn = null;

		try {
			conn = await pool.connect();

			const queryResult = await conn.query(
				`SELECT * FROM ${tableName} WHERE id = ${id}`
			);
			if (queryResult.rows.length > 1) {
				throw new ApiError(
					`Multiple users found with same id = '${id}'`
				);
			}
			res = queryResult.rows[0];
		} catch (err) {
			console.error(
				"Error quering database with selectById operation",
				err
			);
		} finally {
			conn?.release();
		}

		return res;
	}

	async updateById(id, changes) {
		let conn = null;

		try {
			conn = await pool.connect();

			await conn.query(
				`UPDATE ${tableName} SET "firstName" = '${changes.firstName}', "lastName" = '${changes.lastName}', username = '${changes.username}', email = '${changes.email}' WHERE id = ${id}`
			);
		} catch (err) {
			console.error(
				"Error quering database with selectById operation",
				err
			);
		} finally {
			conn?.release();
		}
	}

	async count(query) {
		let count = null;
		let conn = null;

		try {
			conn = await pool.connect();

			const queryResult = await conn.query(query);
			count = Number(queryResult.rows[0].count);
		} catch (err) {
			console.error("Error quering database with count operation", err);
		} finally {
			conn?.release();
		}

		return count;
	}

	async existsByEmail(email) {
		let result = null;
		let conn = null;

		try {
			conn = await pool.connect();

			const queryResult = await conn.query(
				`SELECT EXISTS(SELECT * FROM ${tableName} WHERE email = '${email}')`
			);
			result = Boolean(queryResult.rows[0].exists);
		} catch (err) {
			console.error(
				"Error quering database with existsByEmail operation",
				err
			);
		} finally {
			conn?.release();
		}

		return result;
	}

	async existsByUsername(username) {
		let result = null;
		let conn = null;

		try {
			conn = await pool.connect();

			const queryResult = await conn.query(
				`SELECT EXISTS(SELECT * FROM ${tableName} WHERE username = '${username}')`
			);
			result = Boolean(queryResult.rows[0].exists);
		} catch (err) {
			console.error(
				"Error quering database with existsByUsername operation",
				err
			);
		} finally {
			conn?.release();
		}

		return result;
	}
}

function toSqlInsert(id, user) {
	return `INSERT INTO ${tableName} (id, "firstName", "lastName", username, email, password, role) 
    VALUES (${id}, '${user.firstName}', '${user.lastName}', '${user.username}', '${user.email}', '${user.password}', '${user.role}');`;
}

const repo = new userRepository();
module.exports = repo;
