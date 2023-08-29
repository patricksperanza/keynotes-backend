import { db } from "../database.js";
import jwt from "jsonwebtoken";

// Find your teacher with lookup code
export const find = (req, res) => {
  // Authenticate user
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  // Find the teacher using the lookup code and send the teacher's information
  const query = "SELECT * FROM user WHERE code = ?";

  db.query(query, [req.body.code], (err, data) => {
    if (err) return res.json(err);
    if (!data.length) return res.status(409).json("Teacher not found");

    const { password, ...userInfo } = data[0];
    return res.status(200).json({ ...userInfo });
  });
};

// Add connection to the teacher
export const add = (req, res) => {
  // Authenticate the user
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  // Insert student and teacher ids into the connection table in database
  const query = "INSERT INTO connection (student_id, teacher_id) VALUES (?, ?)";

  db.query(
    query,
    [req.body.currentUser.user_id, req.body.teacher.user_id],
    (err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json("Teacher has been added");
    }
  );
};
