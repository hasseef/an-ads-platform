import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav
      style={{
        padding: "10px 20px",
        background: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{ fontWeight: "bold" }}>آن للدعاية والإعلان</div>
      <div>
        {user ? (
          <>
            <span style={{ marginInlineEnd: "10px" }}>
              {user.name} ({user.role})
            </span>
            <button onClick={onLogout}>تسجيل خروج</button>
          </>
        ) : (
          <span>مرحبًا بك</span>
        )}
      </div>
    </nav>
  );
}
