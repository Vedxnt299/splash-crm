import { useState } from "react";
import api from "../api/axios";

export default function CreateUser() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "SALES"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", form);
      alert("User created successfully");
      window.location.href = "/leads";
    } catch {
      alert("Failed to create user");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400 }}>
      <h2>Create User</h2>

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
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="SALES">SALES</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <br /><br />

        <button type="submit">Create User</button>

      </form>
    </div>
  );
}