"use client";

import { useEffect, useState } from "react";

import TodoList from "./TodoList";
import TodoAddTask from "./TodoAddTask";
import TodoDeleteTask from "./TodoDeleteTask";

import { supabase } from "@/utils/supabase";
import { getAllTodos } from "@/utils/supabaseFunction";

import { Todo } from "@/types/TodoType";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos as Todo[]);
    };
    getTodos();
    fetchRealtimeTodo();
  }, []);

  const fetchRealtimeTodo = () => {
    try {
      supabase
        .channel("table_postgres_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "todo",
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const { id, title, completed } = payload.new;
              setTodos((todos) => [...todos, { id, title, completed }]);
            }
            if (payload.eventType === "DELETE") {
              setTodos((todos) =>
                todos.filter((todo) => todo.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();

      return () => {
        supabase.channel("table_postgres_changes").unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
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
      <TodoDeleteTask />
    </section>
  );
}
