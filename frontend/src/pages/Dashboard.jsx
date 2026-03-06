import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {

const [summary, setSummary] = useState(null);
const [followups, setFollowups] = useState(null);
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

// Load followups
api.get("/dashboard/followups")
  .then(res => setFollowups(res.data))
  .catch(() => {});

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

    {/* Navigation */}
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
        <>
          <button
            onClick={() => window.location.href = "/create-user"}
            style={{ marginLeft: 10 }}
          >
            Create User
          </button>

          <button
            onClick={() => window.location.href = "/import-leads"}
            style={{ marginLeft: 10 }}
          >
            Import Leads
          </button>
        </>
      )}
    </div>

    {/* Dashboard Cards */}
    <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
      <Card title="TOTAL" value={summary.TOTAL} />
      <Card title="HOT" value={summary.HOT} />
      <Card title="WARM" value={summary.WARM} />
      <Card title="PROSPECT" value={summary.PROSPECT} />
      <Card title="SMP" value={summary.SMP} />

      <Card title="TODAY FOLLOWUPS" value={summary.FOLLOWUPS_TODAY} />
      <Card title="OVERDUE FOLLOWUPS" value={summary.FOLLOWUPS_OVERDUE} />
      <Card title="UPCOMING FOLLOWUPS" value={summary.FOLLOWUPS_UPCOMING} />
    </div>

    {/* Followup Lead Lists */}
    {followups && (
      <div style={{ marginTop: 40 }}>
        <FollowupSection title="Today's Calls" leads={followups.today} />
        <FollowupSection title="Overdue Calls" leads={followups.overdue} />
        <FollowupSection title="Upcoming Calls" leads={followups.upcoming} />
      </div>
    )}

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
> <h3>{title}</h3>
<p style={{ fontSize: 24 }}>{value}</p> </div>
);
}

function FollowupSection({ title, leads }) {

if (!leads || leads.length === 0) return null;

return (
<div style={{ marginBottom: 30 }}> <h3>{title}</h3>


  <ul style={{ paddingLeft: 20 }}>
    {leads.map((lead) => (
      <li
        key={lead.id}
        style={{ cursor: "pointer", marginBottom: 6 }}
        onClick={() => window.location.href = "/lead?id=" + lead.id}
      >
        {lead.name} {lead.city ? `(${lead.city})` : ""}
      </li>
    ))}
  </ul>
</div>


);
}
