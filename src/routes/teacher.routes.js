import express from "express";
import { signup , login , getMe } from "../controllers/auth.controller.js";
import protectTeacherRoute from "../middleware/auth.middleware.js";

const teacherRouter = express.Router();

teacherRouter.post("/signup", signup);
teacherRouter.post("/login", login);
teacherRouter.get("/me", protectTeacherRoute , getMe);

export default teacherRouter;