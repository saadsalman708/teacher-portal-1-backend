import express from "express";
const authRouter = express.Router();

import upaload from "../middleware/multer.js";

import { getPosts, create, remove , update } from "../controllers/post.controller.js";

// authRouter.post("/", upload.single("image"), create);
authRouter.post("/", create);
authRouter.get("/", getPosts);
authRouter.put("/:id", update);
authRouter.delete("/:id", remove);

export default authRouter;