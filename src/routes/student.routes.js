import express from "express";
import protectTeacherRoute from "../middleware/auth.middleware.js";

const studentRouter = express.Router();

import { getStudents , create , remove , update} from "../controllers/student.controller.js";

studentRouter.get("/students", protectTeacherRoute, getStudents);
studentRouter.post("/student/create", protectTeacherRoute, create);
studentRouter.put("/student/update/:id", protectTeacherRoute, update);
studentRouter.delete("/student/delete/:id", protectTeacherRoute, remove);

export default studentRouter;