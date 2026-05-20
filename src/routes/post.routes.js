import express from "express";
const router = express.Router();

import upload from "../middleware/multer.js";

import { getPosts, create, remove , update } from "../controllers/post.controller.js";

router.post("/", upload.single("image"), create);
// router.post("/", create);
router.get("/", getPosts);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;