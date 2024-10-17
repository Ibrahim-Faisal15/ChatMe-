import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

// MIDDLEWARES
app.use(cors());

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//-----------------------------------------------------------------------------------\\

import userRouters from "./routes/user.route.js";

//routes
app.use("/api/v1/user", userRouters);

export default app;
