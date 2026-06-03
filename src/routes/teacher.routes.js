import express from "express";
import {
  signup,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  signOut,
} from "../controllers/auth.controller.js";
import protectTeacherRoute from "../middleware/auth.middleware.js";

const teacherRouter = express.Router();

teacherRouter.post("/signup", signup);
teacherRouter.post("/login", login);
teacherRouter.get("/me", protectTeacherRoute, getMe);
teacherRouter.post("/forgot-password", forgotPassword);
teacherRouter.patch("/reset-password/:token", resetPassword);
teacherRouter.post("/logout", signOut);

export default teacherRouter;