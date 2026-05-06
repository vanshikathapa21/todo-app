import { useState } from "react";
import "./App.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const trimmedTask = task.trim();
  const completedCount = tasks.filter((item) => item.completed).length;
  const pendingCount = tasks.length - completedCount;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (trimmedTask === "") return;

    if (editId !== null) {
      setTasks(
        tasks.map((item) =>
          item.id === editId ? { ...item, text: trimmedTask } : item
        )
      );
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        { id: crypto.randomUUID(), text: trimmedTask, completed: false },
      ]);
    }

    setTask("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    if (editId === id) {
      setTask("");
      setEditId(null);
    }
  };

  const handleEdit = (id) => {
    const selectedTask = tasks.find((item) => item.id === id);
    setTask(selectedTask?.text || "");
    setEditId(id);
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  return (
    <div className="container">
      <header className="todo-header">
        <div>
          <span className="eyebrow">Workspace</span>
          <h2 className="title">Today&apos;s Tasks</h2>
        </div>
        <div className="progress-pill">
          <strong>{completedCount}</strong>
          <span>done</span>
        </div>
      </header>

      <section className="stats-grid" aria-label="Task summary">
        <div>
          <span>Total</span>
          <strong>{tasks.length}</strong>
        </div>
        <div>
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>
        <div>
          <span>Complete</span>
          <strong>{completedCount}</strong>
        </div>
      </section>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <form className="input-box" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Add a task..."
        />

        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>

      <div className="task-list">
        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <strong>No tasks here</strong>
            <span>
              {tasks.length === 0
                ? "Add your first task to begin."
                : "Try another filter."}
            </span>
          </div>
        )}

        {filteredTasks.map((item) => (
          <div
            className={`todo-card ${item.completed ? "is-complete" : ""}`}
            key={item.id}
          >
            <p className={item.completed ? "completed" : ""}>{item.text}</p>

            <div className="btn-group">
              <button className="edit" onClick={() => handleEdit(item.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
              <button className="complete" onClick={() => handleToggle(item.id)}>
                {item.completed ? "Undo" : "Done"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
