import { deleteAllSupabaseTodo } from "@/utils/supabaseFunction";

export default function ToddoDeleteTask() {

  const handleAllDelete = () => {
    const isConfirm = window.confirm(
      "選択済みのタスクを削除してもよろしいですか？"
    );
    if (!isConfirm) return;
    deleteAllSupabaseTodo();
  };

  return (
    <div>
        <button
          className="p-1 shadow-md border-2 rounded-lg bg-red-200 hover:opacity-60"
          onClick={handleAllDelete}
        >
          選択したタスクを削除
        </button>
      </div>
  )
}