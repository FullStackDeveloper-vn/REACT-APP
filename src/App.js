import React, { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error retrieving tasks: ', error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newTask })
    })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task: ', error));
  };

  const handleUpdateTask = (id, description) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, description };
      }
      return task;
    });
    setTasks(updatedTasks);
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    })
      .catch(error => console.error('Error updating task: ', error));
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' })
      .catch(error => console.error('Error deleting task: ', error));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              disabled='true'
              type="text"
              value={task.description}
              onChange={e => handleUpdateTask(task.id, e.target.value)}
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};
