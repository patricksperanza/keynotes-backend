import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import lessonRoutes from "./routes/lesson.js";
import lookupRoutes from "./routes/lookup.js";
import { db } from "./database.js";

const app = express();

// Cors options needed for receiving credentials via cookie
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/lesson", lessonRoutes);
app.use("/lookup", lookupRoutes);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});