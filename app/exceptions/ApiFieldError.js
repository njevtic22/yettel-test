const ApiError = require("./ApiError");

class ApiFieldError extends ApiError {
	constructor(singleMessage, details, statusCode) {
		super(singleMessage, statusCode);
		this.details = details;
	}
}

module.exports = ApiFieldError;
