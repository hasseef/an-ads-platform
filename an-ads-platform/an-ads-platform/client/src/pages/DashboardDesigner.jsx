import React, { useEffect, useState } from "react";
import { getDesignRequests, updateDesignRequest } from "../api.js";

export default function DashboardDesigner({ user }) {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const data = await getDesignRequests({
      role: "designer",
      userId: user.id
    });
    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleTake = async (id) => {
    await updateDesignRequest(id, {
      designerId: user.id,
      status: "in_progress"
    });
    await loadRequests();
  };

  const handleComplete = async (id) => {
    await updateDesignRequest(id, { status: "completed" });
    await loadRequests();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>لوحة المصمم</h2>
      <p>يمكنك استلام الطلبات وتحديث حالتها (نموذج تجريبي).</p>

      {requests.length === 0 ? (
        <p>لا توجد طلبات متاحة حاليًا.</p>
      ) : (
        <ul>
          {requests.map((r) => (
            <li key={r.id} style={{ marginBottom: "10px" }}>
              <strong>#{r.id}</strong> - {r.title} — الحالة: {r.status}{" "}
              {r.designerId && <span>(مصمم ID: {r.designerId})</span>}
              <div style={{ marginTop: "5px" }}>
                {!r.designerId && (
                  <button onClick={() => handleTake(r.id)}>
                    استلام هذا الطلب
                  </button>
                )}
                {r.designerId === user.id && r.status !== "completed" && (
                  <button
                    style={{ marginInlineStart: "10px" }}
                    onClick={() => handleComplete(r.id)}
                  >
                    إنهاء الطلب
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
