"use client";

import { addSupabaseTodo } from "@/utils/supabaseFunction";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoAddTask() {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "") return;

    await addSupabaseTodo({ id: uuidv4(), title: title, completed: false });
    setTitle("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className="mr-2 shadow-lg p-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="shadow-md border-2 p-1 rounded-lg bg-green-200 hover:opacity-60">
        AddTodo
      </button>
    </form>
  );
}
