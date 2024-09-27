class ApiError extends Error {
	constructor(statusCode, message, stackTrace) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		if (stackTrace) {
			this.stack = stackTrace;
		} else {
			this.stack = Error.captureStackTrace(
				this,
				ApiError
			);
		}
	}
}

export default ApiError;
