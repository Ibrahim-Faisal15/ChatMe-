class ApiResponse {
	constructor(status_Code, data, message = "Success!") {
		this.statusCode = status_Code;
		this.data = data;
		this.message = message;
	}
}

export default ApiResponse;
