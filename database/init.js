const { pool } = require("./config");

const usersTable = "users";
const tasksTable = "tasks";

async function dropTable(tableName) {
	let conn = null;

	try {
		conn = await pool.connect();

		await conn.query("DROP TABLE IF EXISTS " + tableName + " CASCADE");
	} catch (err) {
		console.log("Error droping table " + tableName);
		console.log(err);
	} finally {
		conn?.release();
	}
}

async function createUsers() {
	let conn = null;

	try {
		conn = await pool.connect();

		await conn.query(
			`
            create table users (
                id bigint not null,
                email varchar(255) not null unique,
                first_name varchar(255) not null,
                last_name varchar(255) not null,
                password varchar(255) not null,
                role varchar(255) not null check ((role in ('BASIC','ADMIN'))),
                username varchar(255) not null unique,
                primary key (id)
            )
            `
		);
	} catch (err) {
		console.log("Error creating table users");
		console.log(err);
	} finally {
		conn?.release();
	}
}

async function createTasks() {
	let conn = null;

	try {
		conn = await pool.connect();

		await conn.query(
			`
            create table tasks (
                id bigint not null,
                user_id bigint,
                body varchar(1000) not null,
                primary key (id)
            )
            `
		);

		await conn.query(
			`
            alter table tasks 
                add constraint user_foreign_key 
                foreign key (user_id) 
                references users
            `
		);
	} catch (err) {
		console.log("Error creating table tasks");
		console.log(err);
	} finally {
		conn?.release();
	}
}

async function dbInit() {
	console.log("Initalizing database");

	await dropTable(usersTable);
	await dropTable(tasksTable);

	await createUsers();
	await createTasks();

	console.log("Initialized database");
}

module.exports = dbInit;
