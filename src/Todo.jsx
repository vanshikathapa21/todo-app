import React, { useState } from 'react'

const Todo = () => {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const handleAdd = () => {
    setTasks([...tasks, task])
    setTask('')
  }

  return (
    <div>
      <h2>Todo App</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  )
}

export default Todo