import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import lessonRoutes from "./routes/lesson.js";
import lookupRoutes from "./routes/lookup.js";
import "dotenv/config.js";

const app = express();

// Cors options needed for receiving credentials via cookie
const corsOptions = {
  origin: ["http://localhost:5173", "https://keynotesmusic.netlify.app"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "Super Secret (change it)",
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true, // must be true if sameSite='none'
    },
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/lesson", lessonRoutes);
app.use("/lookup", lookupRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
