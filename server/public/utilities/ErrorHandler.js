class ErrorHandler extends Error {
	constructor(status, message, origin) {
		super();
		this.status = status;
		this.message = message;
		this.origin = origin;
	}
}

module.exports = ErrorHandler;
