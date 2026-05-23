import express from "express";
const studentRouter = express.Router();

import { getStudents , create , remove , update} from "../controllers/student.controller.js";

studentRouter.get("/students", getStudents);
studentRouter.post("/student/create", create);
studentRouter.put("/student/update/:id", update);
studentRouter.delete("/student/delete/:id", remove);

export default studentRouter;