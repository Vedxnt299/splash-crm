import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AddLead() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    estimatedOrderValue: "",
    temperature: "PROSPECT",
    assignedUserId: ""
  });

  // Load users once
  useEffect(() => {
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      phoneNumber: form.phoneNumber,
      city: form.city,
      temperature: form.temperature,
      estimatedOrderValue: form.estimatedOrderValue
        ? Number(form.estimatedOrderValue)
        : null,
      assignedTo: form.assignedUserId
        ? { id: Number(form.assignedUserId) }
        : null
    };

    try {
      await api.post("/leads", payload);
      alert("Lead added successfully");
      window.location.href = "/leads";
    } catch (err) {
      alert(err.response?.data?.message || "Error adding lead");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400 }}>
      <h2>Add Lead</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          required
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="estimatedOrderValue"
          placeholder="Estimated Order Value"
          type="number"
          value={form.estimatedOrderValue}
          onChange={handleChange}
        />
        <br /><br />

        {/* Temperature */}
        <select
          name="temperature"
          value={form.temperature}
          onChange={handleChange}
        >
          <option value="HOT">HOT</option>
          <option value="WARM">WARM</option>
          <option value="PROSPECT">PROSPECT</option>
          <option value="SMP">SMP</option>
        </select>

        <br /><br />

        {/* Assigned User */}
        <select
          name="assignedUserId"
          value={form.assignedUserId}
          onChange={handleChange}
        >
          <option value="">Unassigned</option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </select>

        <br /><br />

        <button type="submit">Save Lead</button>

      </form>
    </div>
  );
}