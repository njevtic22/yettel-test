class ApiError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.isCustom = true;
	}
}

module.exports = ApiError;
