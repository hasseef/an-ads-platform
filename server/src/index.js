import express from "express";
import cors from "cors";
import { PORT, FRONTEND_ORIGIN } from "./config.js";
import { users, requests } from "./data.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN
  })
);

app.get("/", (req, res) => {
  res.json({ message: "API آن للدعاية والإعلان تعمل بنجاح (نموذج تجريبي)" });
});

app.post("/api/login", (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) {
    return res.status(400).json({ message: "username و role مطلوبان" });
  }
  let user = users.find((u) => u.username === username && u.role === role);
  if (!user) {
    user = {
      id: users.length + 1,
      username,
      role,
      name: username
    };
    users.push(user);
  }
  res.json({ user });
});

app.get("/api/requests", (req, res) => {
  res.json(requests);
});

app.post("/api/requests", (req, res) => {
  const { title, service, withPrint } = req.body;
  if (!title || !service) {
    return res.status(400).json({ message: "title و service مطلوبان" });
  }
  const id = requests.length + 1;
  const request = {
    id,
    title,
    service,
    withPrint: !!withPrint,
    status: "pending"
  };
  requests.push(request);
  res.status(201).json(request);
});

app.patch("/api/requests/:id", (req, res) => {
  const id = Number(req.params.id);
  const request = requests.find((r) => r.id === id);
  if (!request) {
    return res.status(404).json({ message: "الطلب غير موجود" });
  }
  const { status } = req.body;
  if (status) request.status = status;
  res.json(request);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
