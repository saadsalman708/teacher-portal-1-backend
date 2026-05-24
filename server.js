import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/post.routes.js";
import studentRouter from "./src/routes/student.routes.js";
import teacherRouter from "./src/routes/teacher.routes.js";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", teacherRouter);
app.use("/api/v1", studentRouter);

app.listen(PORT, () => {
  console.log("server is running!");
});