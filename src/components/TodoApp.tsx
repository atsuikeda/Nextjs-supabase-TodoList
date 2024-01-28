"use client";

import TodoList from "./TodoList";
import TodoAddTask from "./TodoAddTask";
import { useEffect, useState } from "react";
import { deleteAllSupabaseTodo, getAllTodos } from "@/utils/supabaseFunction";
import { Todo } from "@/types/TodoType";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos as Todo[]);
    };
    getTodos();
  }, []);

  const handleAllDelete = () => {
    const isConfirm = window.confirm(
      "選択済みのタスクを削除してもよろしいですか？"
    );
    if (!isConfirm) return;
    deleteAllSupabaseTodo();
  };

  return (
    <section className="text-center p-4 mb-2 font-medium rounded-lg bg-gray-100 ">
      <h3 className="text-2xl">TodoList</h3>
      <TodoAddTask />
      <div>
        <ul className="mx-auto ">
          {todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
      <div>
        <button
          className="p-1 shadow-md border-2 rounded-lg bg-red-200 hover:opacity-60"
          onClick={handleAllDelete}
        >
          選択したタスクを削除
        </button>
      </div>
    </section>
  );
}
