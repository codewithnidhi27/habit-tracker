import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    API.get("/habits")
      .then((res) => setHabits(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>My Habits</h1>
      <ul>
        {habits.map((h) => (
          <li key={h.id}>{h.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
