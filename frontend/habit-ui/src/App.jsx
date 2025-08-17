import { useEffect, useState } from "react";
import { getHabits, addHabit, completeHabit, deleteHabit } from "./services/habits";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", frequency: "DAILY" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await getHabits();
    setHabits(res.data);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    await addHabit(form);
    setForm({ name: "", description: "", frequency: "DAILY" });
    await load();
    setLoading(false);
  };

  const onComplete = async (id) => {
    await completeHabit(id);
    await load();
  };

  const onDelete = async (id) => {
    await deleteHabit(id);
    await load();
  };

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", padding: 16 }}>
      <h1>Smart Habit Tracker</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, marginBottom: 24 }}>
        <input
          placeholder="Habit name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.frequency}
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
        >
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Add Habit"}</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
        {habits.map((h) => (
          <li key={h.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <strong>{h.name}</strong>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{h.description}</div>
            <div style={{ marginTop: 6 }}>
              Frequency: {h.frequency} • Streak: {h.streakCount}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => onComplete(h.id)}>Mark Complete</button>
              <button onClick={() => onDelete(h.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
