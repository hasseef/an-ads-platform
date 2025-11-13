import express from "express";
import { designRequests } from "../data/fakeDb.js";

const router = express.Router();

// إنشاء طلب تصميم جديد
router.post("/design", (req, res) => {
  const { clientId, title, budget, notes } = req.body;

  if (!clientId || !title) {
    return res.status(400).json({ message: "clientId و title مطلوبان" });
  }

  const newReq = {
    id: designRequests.length + 1,
    clientId,
    designerId: null, // لم يتم تعيين مصمم بعد
    title,
    budget: budget || 0,
    notes: notes || "",
    status: "pending" // pending | in_progress | completed
  };

  designRequests.push(newReq);

  return res.status(201).json({
    message: "تم إنشاء طلب التصميم بنجاح",
    request: newReq
  });
});

// قائمة طلبات التصميم حسب الدور
router.get("/design", (req, res) => {
  const { role, userId } = req.query;

  let list = designRequests;

  if (role === "client" && userId) {
    list = list.filter((r) => r.clientId === Number(userId));
  }

  if (role === "designer" && userId) {
    // يمكن تخصيص المنطق لاحقًا
    list = list;
  }

  return res.json(list);
});

// تحديث طلب تصميم (استلام/إنهاء)
router.patch("/design/:id", (req, res) => {
  const id = Number(req.params.id);
  const { designerId, status } = req.body;

  const request = designRequests.find((r) => r.id === id);
  if (!request) {
    return res.status(404).json({ message: "الطلب غير موجود" });
  }

  if (designerId) {
    request.designerId = designerId;
  }

  if (status) {
    request.status = status;
  }

  return res.json({
    message: "تم تحديث الطلب",
    request
  });
});

export default router;
