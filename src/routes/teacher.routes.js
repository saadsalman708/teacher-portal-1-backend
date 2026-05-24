import express from "express";
import { signup , login } from "../controllers/auth.controller.js";

const teacherRouter = express.Router();

teacherRouter.post("/signup", signup);
teacherRouter.post("/login", login);

export default teacherRouter;