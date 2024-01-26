"use client";

import { addTodo } from "@/utils/supabaseFunction";
import TodoList from "./TodoList";
import { FormEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoApp() {
  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  // const todoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // const todoTitle = todoInputRef.current?.value;
    if (title === "") {
      return;
    }
    e.preventDefault();
    await addTodo({ id: uuidv4(), title, completed });
  };

  return (
    <section className="text-center p-4 mb-2 text-2xl font-medium rounded-lg bg-gray-100 ">
      <h3>TodoList</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* <input type="text" className="mr-2 shadow-lg p-1" ref={todoInputRef} onChange={(e) => setTitle(e.target.value)} /> */}
        <input
          type="text"
          className="mr-2 shadow-lg p-1"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="shadow-md border-2 p-1 rounded-lg bg-green-200">
          AddTodo
        </button>
      </form>
      <TodoList />
    </section>
  );
}
