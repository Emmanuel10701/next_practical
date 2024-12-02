"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
  }

  async function addTask() {
    if (newTaskTitle.trim() === '') return;
    await axios.post('/api/tasks', { title: newTaskTitle });
    setNewTaskTitle('');
    fetchTasks();
  }

  async function toggleTaskCompletion(taskId, currentStatus) {
    await axios.put(`/api/tasks/${taskId}`, { completed: !currentStatus });
    fetchTasks();
  }

  async function deleteTask(taskId) {
    await axios.delete(`/api/tasks/${taskId}`);
    fetchTasks();
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Task Manager</h1>
      
      <div className="flex mb-6">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add new task"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-4 rounded shadow ${
              task.completed ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <span
              className={`flex-1 ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleTaskCompletion(task.id, task.completed)}
                className={`px-2 py-1 rounded text-white ${
                  task.completed ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
