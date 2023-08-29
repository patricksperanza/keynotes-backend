import express from "express";
const router = express.Router();

import {
  addLesson,
  getLessons,
  deleteLesson,
  editLesson,
} from "../controllers/lesson.js";

router.post("/add", addLesson);

router.post("/", getLessons);

router.post("/delete", deleteLesson);

router.post("/edit", editLesson);

export default router;
