import app from "./app.js";
import DatabseConnection from "./db/index.db.js";
import "dotenv/config";

DatabseConnection()
	.then(() => {
		app.on("error", (error) => {
			console.log(
				"Database Connection Error: ",
				error
			);
		});

		app.listen(process.env.PORT || 3000, () => {
			console.log(
				`Server is running on port ${process.env.PORT}`
			);
		});
	})
	.catch((error) => {
		console.error(
			"Error connecting to database",
			error
		);
		process.exit(1);
	});
