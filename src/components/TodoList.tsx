"use client";

import { Todo } from "@/types/TodoType";
import { getAllTodos } from "@/utils/supabaseFunction";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos as Todo[]);
    };
    getTodos();
  }, []);

  return (
    <div>
      <ul className="mx-auto ">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex bg-blue-100 rounded-lg m-2 p-2 justify-between"
          >
            <li>✅{todo.title}</li>
            {todo.completed ? (
              <span>Completed!</span>
            ) : (
              <span className="cursor-pointer">&#215;</span>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
