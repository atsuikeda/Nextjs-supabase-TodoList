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

export const addSupabaseTodo = async ({ id, title, completed }: Todo) => {
  try {
    await supabase.from("todo").insert({ id, title, completed });
  } catch (error) {
    console.error(error);
  }
};

export const deleteSupabaseTodo = async (todoId: string) => {
  try {
    await supabase.from("todo").delete().match({ id: todoId });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllSupabaseTodo = async () => {
  try {
    await supabase.from("todo").delete().match({ completed: true });
  } catch (error) {
    console.error(error);
  }
};

export const checkSupabaseTodo = async (todoId: string, newChecked: boolean) => {
  try {
    await supabase
      .from("todo")
      .update({ completed: newChecked })
      .match({ id: todoId });
  } catch (error) {
    console.error(error);
  }
};

