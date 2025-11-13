const API_BASE = "http://localhost:4000/api";

export async function login(username, role) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, role })
  });
  if (!res.ok) throw new Error("فشل تسجيل الدخول");
  return res.json();
}

export async function createDesignRequest(payload) {
  const res = await fetch(`${API_BASE}/requests/design`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("فشل إنشاء الطلب");
  return res.json();
}

export async function getDesignRequests(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/requests/design?${query}`);
  if (!res.ok) throw new Error("فشل جلب الطلبات");
  return res.json();
}

export async function updateDesignRequest(id, payload) {
  const res = await fetch(`${API_BASE}/requests/design/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("فشل تحديث الطلب");
  return res.json();
}
