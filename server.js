import express from "express";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/post.routes.js";
import userRouter from "./src/routes/user.routes.js";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log("server is running!");
});