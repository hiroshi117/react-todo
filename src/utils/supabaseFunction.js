// supabaseからの取得、削除、追加
import { supabase } from "./supabase";

// 取得
export const getAllTodos = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};

// 追加
export const addTodo = async (title, time) => {
  await supabase.from("study-record").insert({ title: title, time: time });
};

// 削除
export const deleteTodo = async (id) => {
  await supabase.from("study-record").delete().eq("id", id);
};
