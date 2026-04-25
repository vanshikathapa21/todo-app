import React, { useState } from 'react'

const Todo = () => {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [filter, setFilter] = useState("all")

  // ➕ Add / Update Task
  const handleAdd = () => {
    if (task === '') return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks]

      // ✅ Preserve completed status
      updatedTasks[editIndex] = {
        ...updatedTasks[editIndex],
        text: task
      }

      setTasks(updatedTasks)
      setEditIndex(null)
    } else {
      setTasks([...tasks, { text: task, completed: false }])
    }

    setTask('')
  }

  // ❌ Delete Task
  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  // ✏️ Edit Task
  const handleEdit = (index) => {
    setTask(tasks[index].text || '')
    setEditIndex(index)
  }

  // ✅ Toggle Complete
  const handleToggle = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)
  }

  // 🔍 Filter Logic (IMPORTANT)
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed
    if (filter === "pending") return !t.completed
    return true
  })

  return (
    <div>
      <h2>Todo App</h2>

      {/* 🔘 Filter Buttons */}
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>

      <br /><br />

      {/* ✏️ Input */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />

      {/* ➕ Add / Update Button */}
      <button onClick={handleAdd}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      {/* 📋 Task List */}
      <ul>
        {filteredTasks.map((t, index) => (
          <li
            key={index}
            style={{
              textDecoration: t.completed ? "line-through" : "none",
              color: t.completed ? "gray" : "black"
            }}
          >
            {t.text}

            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>

            <button onClick={() => handleToggle(index)}>
              {t.completed ? "Mark Pending" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo