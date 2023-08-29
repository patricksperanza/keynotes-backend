import express from "express";
const router = express.Router();

import { getList } from "../controllers/user.js";

router.post("/list", getList);

export default router;
