import { Todo } from "@/types/TodoType";
import { supabase } from "./supabase";

export const getAllTodos = async () => {
  try {
    const { data, error } = await supabase.from("todo").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addTodo = async ({ id, title, completed }: Todo) => {
  try {
    await supabase.from("todo").insert({ id, title, completed });
  } catch (error) {
    console.error(error);
  }
};
