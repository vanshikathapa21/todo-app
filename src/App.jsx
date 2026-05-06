import { useState } from "react";
import Todo from "./Todo";
import "./App.css";

const App = () => {
  const [start, setStart] = useState(false);

  return (
    <main className="app-shell">
      {start ? (
        <Todo />
      ) : (
        <div className="landing">
          <div className="landing-content">
            <span className="eyebrow">Smart daily planning</span>
            <h1>Task Manager</h1>
            <p>Plan the day, track progress, and keep your priorities clear.</p>
            <button className="primary-action" onClick={() => setStart(true)}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
