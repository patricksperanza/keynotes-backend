import { db } from "../database.js";
import jwt from "jsonwebtoken";

export const getList = (req, res) => {
  // Authenticate the user
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Not authenticated!");

  // jwt.verify(token, "jwtkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");
  // });

  //  Determine type of the current user and make the appropriate query to find all connected students or teachers
  let query = "";

  if (req.body.type === 0) {
    query =
      "SELECT DISTINCT u.user_id, u.first_name, u.last_name, u.email, u.instrument, u.code, u.type FROM user u JOIN connection c ON u.user_id = c.teacher_id WHERE c.student_id = ?";
  } else {
    query =
      "SELECT DISTINCT u.user_id, u.first_name, u.last_name, u.email, u.instrument, u.code, u.type FROM user u JOIN connection c ON u.user_id = c.student_id WHERE c.teacher_id = ?";
  }

  db.query(query, [req.body.user_id], (err, data) => {
    if (err) return res.json(err);
    if (!data.length) return res.status(409).json("List not found");

    res.status(200).json(data);
  });
};
