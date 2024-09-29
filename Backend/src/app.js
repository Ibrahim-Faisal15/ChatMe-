import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

// MIDDLEWARES

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: "16kb" }));
app.use(
	express.urlencoded({ extended: true, limit: "16kb" })
);
app.use(express.static("public"));
app.use(cookieParser());

import userRouters from "./routes/user.route.js";

//routes
app.use("/api/v1/user", userRouters);

export default app;
