import { useEffect, useState } from "react";
import api from "../api/axios";

export default function LeadDetails() {

  const [lead, setLead] = useState(null);
  const [followups, setFollowups] = useState([]);

  const [form, setForm] = useState({
    note: "",
    nextFollowUpDate: "",
    status: "IN_PROGRESS"
  });

  const params = new URLSearchParams(window.location.search);
  const leadId = params.get("id");

  useEffect(() => {

    // Load lead
    api.get(`/leads`)
      .then(res => {
        const found = res.data.find(l => l.id == leadId);
        setLead(found);
      });

    // Load followup history
    api.get(`/followups/lead/${leadId}`)
      .then(res => setFollowups(res.data))
      .catch(() => alert("Failed to load followups"));

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/followups", {
        leadId: Number(leadId),
        note: form.note,
        nextFollowUpDate: form.nextFollowUpDate,
        status: form.status
      });

      console.log("Followup saved:", res.data);

      alert("Follow-up saved successfully");

      window.location.reload();

    } catch (err) {

      console.error(err);

      alert("Error saving follow-up");

    }
  };

  if (!lead) return <p style={{ padding: 30 }}>Loading lead...</p>;

  return (
    <div style={{ padding: 30 }}>

      <h2>Lead Details</h2>

      <p><b>Name:</b> {lead.name}</p>
      <p><b>Phone:</b> {lead.phoneNumber}</p>
      <p><b>City:</b> {lead.city}</p>
      <p><b>Status:</b> {lead.status}</p>

      <hr style={{ margin: "30px 0" }} />

      <h3>Add Follow-up</h3>

      <form onSubmit={handleSubmit}>

        <textarea
          placeholder="What did customer say?"
          style={{ width: 300, height: 80 }}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          required
        />

        <br /><br />

        <input
          type="date"
          onChange={(e) => setForm({ ...form, nextFollowUpDate: e.target.value })}
          required
        />

        <br /><br />

        <select
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        <br /><br />

        <button type="submit">Save Follow-up</button>

      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>Follow-up History</h3>

      {followups.length === 0 && <p>No followups yet</p>}

      {followups.map(f => (
        <div
          key={f.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6
          }}
        >
          <p><b>Date:</b> {f.createdAt?.slice(0,10)}</p>
          <p><b>Note:</b> {f.note}</p>
          <p><b>Next Follow-up:</b> {f.nextFollowUpDate}</p>
        </div>
      ))}

    </div>
  );
}