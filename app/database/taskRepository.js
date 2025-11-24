const ApiError = require("../exceptions/ApiError");
const { pool } = require("./config");

const tableName = "tasks";

class TaskRepository {
	async selectAll(pageable, userId) {
		let res = null;
		let count = null;
		let conn = null;

		const where = userId ? `WHERE "userId" = ${userId}` : "";

		try {
			conn = await pool.connect();

			const select = `SELECT * FROM ${tableName} ${where} ORDER BY "${
				pageable.sort
			}" ${pageable.order} OFFSET ${
				pageable.page * pageable.size
			} ROWS LIMIT ${pageable.size}`;

			res = await conn.query(select);

			count = await this.count(
				`SELECT count(*) FROM ${tableName} ${where}`
			);
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
}

const repo = new TaskRepository();
module.exports = repo;
