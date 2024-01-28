"use client";

import { Todo } from "@/types/TodoType";
import {
  checkSupabaseTodo,
  deleteSupabaseTodo,
} from "@/utils/supabaseFunction";
import { useState } from "react";

type Props = {
  todo: Todo;
};

export default function TodoList({ todo }: Props) {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleChecked = async () => {
    await checkSupabaseTodo(todo.id, !isChecked);
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    const isConfirm = window.confirm('削除してもよろしいですか？');
    if (!isConfirm) return;
    deleteSupabaseTodo(todo.id);
  };

  return (
    <li className="flex bg-blue-100 rounded-lg m-2 p-2 justify-between">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
        className="w-4"
      />

      <p>{todo.title}</p>
      <button className="hover:opacity-60" onClick={handleDelete}>
        &#215;
      </button>
    </li>
  );
}
