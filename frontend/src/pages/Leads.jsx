import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await api.delete(`/leads/${id}`);
      setLeads(leads.filter(l => l.id !== id));
    } catch {
      alert("Only admin can delete leads");
    }
  };

  useEffect(() => {
    // fetch leads
    api.get("/leads")
      .then(res => setLeads(res.data))
      .catch(() => {
        alert("Session expired");
        localStorage.clear();
        window.location.href = "/";
      });

    // check current user role
    api.get("/auth/me")
      .then(res => {
        setIsAdmin(res.data.role === "ADMIN");
        console.log("Is Admin:", res.data.role === "ADMIN");
      })
      .catch(() => {
        // ignore, handled by leads call
      });
  }, []);


  return (
    <div style={{ padding: 30 }}>
      <h2>Leads</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Estimated Value (₹)</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Temperature</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.phoneNumber}</td>
              <td>{lead.city}</td>

              {/* Estimated Order Value */}
              <td>
                {lead.estimatedOrderValue
                  ? `₹ ${lead.estimatedOrderValue.toLocaleString()}`
                  : "-"}
              </td>

              {/* Assigned User */}
              <td>
                {lead.assignedTo
                  ? lead.assignedTo.name || lead.assignedTo.email
                  : "Unassigned"}
              </td>

              <td>{lead.status}</td>
              <td>{lead.temperature}</td>
              <td>
                              <button onClick={() => editLead(lead.id)}>Edit</button>
                              <button
                                onClick={() => deleteLead(lead.id)}
                                style={{ marginLeft: 8, color: "red" }}
                              >
                                Delete
                              </button>
                            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
