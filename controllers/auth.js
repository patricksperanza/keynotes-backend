import { db } from "../database.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const register = (req, res) => {
  // Check if the user already exists
  const query1 = "SELECT * FROM user WHERE email = ?";

  db.query(query1, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create a unique lookup code for the user so students can find their teacher
    const code = uuid();

    // Determine numerical type for database
    // Students are 0
    // Teachers are 1
    const type = req.body.type === "student" ? 0 : 1;

    // Add user to the database
    const query2 =
      "INSERT INTO user (first_name, last_name, email, password, instrument, code, type) VALUES (?)";

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hash,
      req.body.instrument,
      code,
      type,
    ];

    db.query(query2, [values], (err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

// Login a user
export const login = (req, res) => {
  console.log(req.body);
  //Check Type of User to determine if teacher or student
  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // Create JWT token and send via http-only cookie
    const token = jwt.sign({ id: data[0].teacher_id }, "jwtkey");

    // Destructure user info to send to client
    const { user_id, email, first_name, instrument, last_name, code, type } =
      data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        user_id,
        email,
        first_name,
        instrument,
        last_name,
        code,
        type,
      });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
