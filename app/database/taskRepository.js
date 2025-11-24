const ApiError = require("../exceptions/ApiError");
const { pool } = require("./config");

const tableName = "tasks";

class TaskRepository {
	async insert(newTask) {
		let res = null;
		let conn = null;

		const count = await this.count(`SELECT count(*) FROM ${tableName}`);
		try {
			conn = await pool.connect();

			const insert = toSqlInsert(count + 1, newTask);

			res = await conn.query(insert);
		} catch (err) {
			console.error("Error quering database with insert operation", err);
		} finally {
			conn?.release();
		}

		return { id: count + 1, ...newTask };
	}

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
					`Multiple tasks found with same id = '${id}'`
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
				`UPDATE ${tableName} SET body = '${changes.body}' WHERE id = ${id}`
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
}

function toSqlInsert(id, task) {
	return `INSERT INTO ${tableName} (id, created, "userId", body) 
    VALUES (${id}, '${task.created}', ${task.userId}, '${task.body}');`;
}

const repo = new TaskRepository();
module.exports = repo;
