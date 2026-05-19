import express from "express";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import router from "./src/routes/post.routes.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());

app.use("/api/posts", router);

app.listen(PORT, () => {
  console.log("server is running!");
});