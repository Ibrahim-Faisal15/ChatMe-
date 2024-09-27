import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

// MIDDLEWARES
app.use(
	cors({
		origin: process.env.WHITELIST_URL,
		credentials: true,
	})
);

app.use(cookieParser());

app.use(json());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

export default app;
