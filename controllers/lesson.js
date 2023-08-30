import { db } from "../database.js";

// Add a lesson
export const addLesson = (req, res) => {
  const query =
    "INSERT INTO post (date, post, student_id, teacher_id ) VALUES (?, ?, ?, ?)";

  db.query(
    query,
    [req.body.date, req.body.value, req.body.studentId, req.body.teacherId],
    (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("Lesson submitted");
    }
  );
};

// Get all lessons between 1 teacher and student
export const getLessons = (req, res) => {
  const query =
    "SELECT * FROM post WHERE (? = student_id OR ? = teacher_id) AND (? = student_id OR ? = teacher_id) ORDER BY post_id DESC";

  db.query(
    query,
    [
      req.body.connectedUserId,
      req.body.connectedUserId,
      req.body.currentUserId,
      req.body.currentUserId,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }

      const lessons = data;

      const getName =
        "SELECT first_name, last_name FROM user WHERE ? = user_id";

      db.query(getName, req.body.connectedUserId, (err, data) => {
        if (err) return res.json(err);

        const name = data[0];

        return res.status(200).json({ lessons, name });
      });
    }
  );
};

// Delete a lesson
export const deleteLesson = (req, res) => {
  const query = "DELETE FROM post WHERE post_id = ?";

  db.query(query, req.body.id, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Lesson deleted");
  });
};

// Edit a lesson
export const editLesson = (req, res) => {
  const query = "UPDATE post SET post = ? WHERE post_id = ?";

  db.query(query, [req.body.post, req.body.id], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Lesson updated");
  });
};
