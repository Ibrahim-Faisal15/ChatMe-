import app from "./app.js";
import DatabseConnection from "./db/index.db.js";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

DatabseConnection()
	.then(() => {
		io.on("connection", (socket) => {
			console.log("New client connected");
			socket.emit("welcome", "Talking from server.........");

			socket.on("msg", (data) => {
				console.log("Data from the client", data);
			});
		});
		server.listen(process.env.PORT || 3000, () => {
			console.log(`Server is running on port ${process.env.PORT || 3000}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to database", error);
		process.exit(1);
	});
