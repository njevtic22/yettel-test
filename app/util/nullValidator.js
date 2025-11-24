const ApiFieldError = require("../exceptions/ApiFieldError");

function validateNull(obj, keys) {
	let details = [];
	for (const key of keys) {
		const value = obj[key];
		if (value == null || value == undefined) {
			details.push(key + " must not be null");
		}
	}

	throw new ApiFieldError("Invalid field(s)", details, 400);
}

function validateAddUser(
	obj,
	keys = ["firstName", "lastName", "email", "username", "password"]
) {
	validateNull(obj, keys);
}

function validateUpdateUser(
	obj,
	keys = ["firstName", "lastName", "email", "username"]
) {
	validateNull(obj, keys);
}

module.exports = { validateAddUser, validateUpdateUser };
