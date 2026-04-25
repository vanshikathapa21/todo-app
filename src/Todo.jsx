import React, { useState } from 'react'

const Todo = () => {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const handleAdd = () => {
  if(task === '') return;

  if(editIndex !== null){
    const updatedTasks = [...tasks]
    updatedTasks[editIndex] = task
    setTasks(updatedTasks)
    setEditIndex(null)
  } else {
    setTasks([...tasks, task])
  }

  setTask('')
}

  const handleDelete=(index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  const handleEdit = (index) => {
  setTask(tasks[index])
  setEditIndex(index)
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
          <li key={index}>
            {t}
              <button onClick={() => handleEdit(editIndex)}>Edit</button>
              <button onClick={()=> handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo