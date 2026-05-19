import express from "express";
const router = express.Router();

import { getPosts, create, remove } from "../controllers/post.controller.js";

router.post("/", create);
router.get("/", getPosts);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;