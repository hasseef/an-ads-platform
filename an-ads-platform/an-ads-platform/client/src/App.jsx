import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import DashboardClient from "./pages/DashboardClient.jsx";
import DashboardDesigner from "./pages/DashboardDesigner.jsx";
import DashboardPrinter from "./pages/DashboardPrinter.jsx";
import { login as apiLogin } from "./api.js";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, role) => {
    const data = await apiLogin(username, role);
    setUser(data.user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderContent = () => {
    if (!user) {
      return (
        <>
          <Home />
          <Login onLogin={handleLogin} />
        </>
      );
    }

    if (user.role === "client") {
      return <DashboardClient user={user} />;
    }

    if (user.role === "designer") {
      return <DashboardDesigner user={user} />;
    }

    if (user.role === "printer") {
      return <DashboardPrinter user={user} />;
    }

    return <Home />;
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      {renderContent()}
    </div>
  );
}
