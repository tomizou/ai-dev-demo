'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      // Clear localStorage if there are no todos
      localStorage.removeItem('todos');
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-4 font-sans dark:bg-black">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
            ToDo App
          </h1>
          <Link
            href="/"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            &larr; Back to Home
          </Link>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task"
            className="flex-grow rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-black focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:text-zinc-50"
          />
          <button
            onClick={addTodo}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer text-lg text-black dark:text-zinc-50 ${
                  todo.completed ? 'text-zinc-400 line-through' : ''
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded-md px-3 py-1 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p className="mt-4 text-center text-zinc-500">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

