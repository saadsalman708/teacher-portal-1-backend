import express from "express";
const router = express.Router();

import { get, create, remove } from "../controllers/post.controller";

router.post("/", create);
router.get("/", get);
// router.put("/" , );
router.delete("/", remove);

export default router;