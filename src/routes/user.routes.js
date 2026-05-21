import express from "express";
const userRouter = express.Router();

import { getUsers , create , remove , update} from "../controllers/user.controller.js";

userRouter.get("/users", getUsers);
userRouter.post("/user/create", create);
userRouter.put("/user/update/:id", update);
userRouter.delete("/user/delete/:id", remove);

export default userRouter;