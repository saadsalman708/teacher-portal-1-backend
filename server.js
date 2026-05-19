import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/post.routes.js";
import "dotenv/config";
import connectDB from "./src/config/db.js"


const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use(router , (req , res)=> {
    res.status(200).json("server says hi!");
});

app.listen(PORT , ()=> {
    console.log("server is running!");
});