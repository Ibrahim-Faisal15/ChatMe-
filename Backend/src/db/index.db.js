import mongoose from "mongoose";
import "dotenv/config";

async function DatabseConnection() {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.DB_URI}${process.env.DB_NAME}`
		);
		console.log(
			`Connecting to ${connectionInstance.connection.host}`
		);
	} catch (error) {
		console.error(
			`Error connecting to the database: ${error.message}`
		);
		process.exit(1);
	}
}

export default DatabseConnection;
