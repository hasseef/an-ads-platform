import express from "express";
import { users } from "../data/fakeDb.js";

const router = express.Router();

// تسجيل دخول بسيط تجريبي
router.post("/login", (req, res) => {
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: "username و role مطلوبان" });
  }

  let user = users.find(
    (u) => u.username === username && u.role === role
  );

  if (!user) {
    // في هذا النموذج، إذا لم يُوجَد المستخدم، ننشئه
    user = {
      id: users.length + 1,
      username,
      role,
      name: username
    };
    users.push(user);
  }

  return res.json({
    message: "تم تسجيل الدخول بنجاح (نموذج تجريبي)",
    user
  });
});

export default router;
