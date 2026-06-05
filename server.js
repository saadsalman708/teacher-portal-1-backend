import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/post.routes.js";
import studentRouter from "./src/routes/student.routes.js";
import teacherRouter from "./src/routes/teacher.routes.js";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// app.use(cors());

const allowedOrigins = [
  // `http://localhost:3000`,
  `${process.env.FRONTEND_URL}`
];

app.use(cors({
    origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("The CORS policy for this site does not allow access from the specified Origin."), false);
    }
    return callback(null, true);
  },
    credentials: true     // 🔑 Explicitly allow the browser to send cookies!
}));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", teacherRouter);
app.use("/api/v1", studentRouter);

app.use((err , req , res , next ) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  console.error(`[Error Vault] : ${statusCode} - ${msg}`);
  res.status(statusCode).json({
    success: false,
    message: msg,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}!`);
});