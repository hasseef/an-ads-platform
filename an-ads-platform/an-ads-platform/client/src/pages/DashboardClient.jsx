import React, { useEffect, useState } from "react";
import { createDesignRequest, getDesignRequests } from "../api.js";

export default function DashboardClient({ user }) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    const data = await getDesignRequests({
      role: "client",
      userId: user.id
    });
    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDesignRequest({
        clientId: user.id,
        title,
        budget: Number(budget) || 0,
        notes
      });
      setTitle("");
      setBudget("");
      setNotes("");
      await loadRequests();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>لوحة العميل</h2>

      <section style={{ marginBottom: "30px" }}>
        <h3>إنشاء طلب تصميم جديد</h3>
        <form onSubmit={handleCreate} style={{ maxWidth: "400px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>عنوان الطلب</label>
            <input
              style={{ width: "100%" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: تصميم هوية لمتجر..."
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>الميزانية التقريبية (اختياري)</label>
            <input
              style={{ width: "100%" }}
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>ملاحظات</label>
            <textarea
              style={{ width: "100%", minHeight: "80px" }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "جارٍ الإرسال..." : "إرسال الطلب"}
          </button>
        </form>
      </section>

      <section>
        <h3>طلباتي الحالية</h3>
        {requests.length === 0 ? (
          <p>لا توجد طلبات حتى الآن.</p>
        ) : (
          <ul>
            {requests.map((r) => (
              <li key={r.id}>
                #{r.id} - {r.title} — الحالة: {r.status}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
