import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onLogin(username, role);
    } catch (err) {
      setError(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>تسجيل الدخول (محلي)</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>اسم المستخدم</label>
          <input
            style={{ width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="مثال: client1"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>الدور</label>
          <select
            style={{ width: "100%" }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">عميل</option>
            <option value="designer">مصمم</option>
            <option value="printer">مطبعة</option>
          </select>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
