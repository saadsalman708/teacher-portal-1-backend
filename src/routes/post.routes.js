import express from "express";
const router = express.Router();

import { getPosts, create, remove } from "../controllers/post.controller";

router.post("/", create);
router.get("/", getPosts);
// router.put("/" , );
router.delete("/", remove);

export default router;