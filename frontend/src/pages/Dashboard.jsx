import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/dashboard/summary")
      .then(res => setSummary(res.data))
      .catch(() => {
        alert("Unauthorized. Please login again.");
        localStorage.clear();
        window.location.href = "/";
      });
  }, []);

  if (!summary) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Dashboard</h2>
      <button onClick={() => window.location.href = "/leads"}>
        View Leads
      </button>
      <button onClick={() => window.location.href = "/add-lead"}>
        Add Lead
      </button>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="TOTAL" value={summary.TOTAL} />
        <Card title="HOT" value={summary.HOT} />
        <Card title="WARM" value={summary.WARM} />
        <Card title="PROSPECT" value={summary.PROSPECT} />
        <Card title="SMP" value={summary.SMP} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      padding: 20,
      border: "1px solid #444",
      borderRadius: 8,
      minWidth: 120,
      textAlign: "center"
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: 24 }}>{value}</p>
    </div>
  );
}
