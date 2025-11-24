const ApiError = require("./../exceptions/ApiError");

function validateNull(obj, keys) {
	for (const key of keys) {
		const value = obj[key];
		if (value == null) {
			throw new ApiError(key + " must not be null", 400);
		}
	}
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
