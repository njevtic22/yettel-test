const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "postgres",
	database: "task-db",
});

async function closePool() {
	try {
		await pool.end();
		console.log("Database pool closed");
	} catch (err) {
		console.error("Error closing pool", err);
	}
}

module.exports = { pool, closePool };
