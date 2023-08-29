import express from "express";
const router = express.Router();

import { find, add } from "../controllers/lookup.js";

router.post("/find", find);

router.post("/add", add);

export default router;
