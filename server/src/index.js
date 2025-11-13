import express from "express";
import cors from "cors";
import { PORT, FRONTEND_ORIGIN } from "./config.js";
import authRoutes from "./routes/auth.js";
import requestsRoutes from "./routes/requests.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN
  })
);

// مسار تجريبي
app.get("/", (req, res) => {
  res.send("API آن للدعاية والإعلان - تعمل بنجاح 🚀");
});

// Auth
app.use("/api/auth", authRoutes);

// Requests
app.use("/api/requests", requestsRoutes);

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
