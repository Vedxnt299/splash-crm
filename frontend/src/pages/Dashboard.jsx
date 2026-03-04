import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {

    // Load dashboard summary
    api.get("/dashboard/summary")
      .then(res => setSummary(res.data))
      .catch(() => {
        alert("Unauthorized. Please login again.");
        localStorage.clear();
        window.location.href = "/";
      });

    // Check logged-in user role
    api.get("/auth/me")
      .then(res => {
        setIsAdmin(res.data.role === "ADMIN");
      })
      .catch(() => {});

  }, []);

  if (!summary) return <p>Loading dashboard...</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 30
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20
          }}
        >
          <h2>Dashboard</h2>

          <button
            onClick={logout}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>

        {/* Navigation buttons */}
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => window.location.href = "/leads"}>
            View Leads
          </button>

          <button
            onClick={() => window.location.href = "/add-lead"}
            style={{ marginLeft: 10 }}
          >
            Add Lead
          </button>

          {isAdmin && (
            <button
              onClick={() => window.location.href = "/create-user"}
              style={{ marginLeft: 10 }}
            >
              Create User
            </button>
          )}
        </div>

        {/* Dashboard Cards */}
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <Card title="TOTAL" value={summary.TOTAL} />
          <Card title="HOT" value={summary.HOT} />
          <Card title="WARM" value={summary.WARM} />
          <Card title="PROSPECT" value={summary.PROSPECT} />
          <Card title="SMP" value={summary.SMP} />
        </div>

      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #444",
        borderRadius: 8,
        minWidth: 120,
        textAlign: "center"
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: 24 }}>{value}</p>
    </div>
  );
}